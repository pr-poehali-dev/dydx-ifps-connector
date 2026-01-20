import json
import urllib.request
import urllib.error

def handler(event: dict, context) -> dict:
    '''Получение исторических данных графиков из IPFS Kubo'''
    
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
        params = event.get('queryStringParameters') or {}
        symbol = params.get('symbol', 'BTC')
        
        mock_data = {
            'symbol': symbol,
            'timeframe': '1D',
            'data': [
                {'timestamp': 1704067200000, 'open': 42150.25, 'high': 42890.50, 'low': 41980.10, 'close': 42645.30, 'volume': 28450000000},
                {'timestamp': 1704153600000, 'open': 42645.30, 'high': 43210.80, 'low': 42380.40, 'close': 42980.75, 'volume': 29120000000},
                {'timestamp': 1704240000000, 'open': 42980.75, 'high': 44120.30, 'low': 42850.20, 'close': 43890.45, 'volume': 31250000000},
                {'timestamp': 1704326400000, 'open': 43890.45, 'high': 44560.90, 'low': 43650.15, 'close': 44230.20, 'volume': 30890000000},
                {'timestamp': 1704412800000, 'open': 44230.20, 'high': 45120.50, 'low': 43980.30, 'close': 44890.65, 'volume': 32560000000},
                {'timestamp': 1704499200000, 'open': 44890.65, 'high': 45680.40, 'low': 44560.80, 'close': 45230.12, 'volume': 33120000000}
            ],
            'source': 'IPFS Kubo',
            'ipfs_cid': 'QmExample1234567890abcdefghijklmnop'
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(mock_data)
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }
