import json
import urllib.request
import urllib.error

def handler(event: dict, context) -> dict:
    '''Получение рыночных данных с dYdX v4 API'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method == 'GET':
        try:
            url = 'https://indexer.dydx.trade/v4/perpetualMarkets'
            
            req = urllib.request.Request(url)
            req.add_header('Accept', 'application/json')
            
            with urllib.request.urlopen(req, timeout=15) as response:
                data = json.loads(response.read().decode('utf-8'))
            
            markets = data.get('markets', {})
            
            tokens = []
            for market_id, market_data in list(markets.items())[:20]:
                try:
                    symbol = market_id.replace('-USD', '').replace('-', '')
                    oracle_price = market_data.get('oraclePrice', '0')
                    price_change = market_data.get('priceChange24H', '0')
                    volume_24h = market_data.get('volume24H', '0')
                    
                    price_val = float(oracle_price) if oracle_price else 0
                    change_val = float(price_change) if price_change else 0
                    
                    if price_val > 0:
                        change_percent = (change_val / (price_val - change_val)) * 100
                    else:
                        change_percent = 0
                    
                    tokens.append({
                        'symbol': symbol,
                        'name': symbol,
                        'price': price_val,
                        'change': round(change_percent, 2),
                        'volume': float(volume_24h) if volume_24h else 0,
                        'marketCap': 0,
                        'market': market_id
                    })
                except (ValueError, TypeError, ZeroDivisionError):
                    continue
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'tokens': tokens})
            }
            
        except urllib.error.HTTPError as e:
            return {
                'statusCode': e.code,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'dYdX API error: {e.reason}'})
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)})
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }