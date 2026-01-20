import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

const mockTokens = [
  { symbol: 'BTC', name: 'Bitcoin', price: 45230.12, change: 2.45, volume: 28500000000, marketCap: 885000000000 },
  { symbol: 'ETH', name: 'Ethereum', price: 2890.45, change: -1.23, volume: 15200000000, marketCap: 347000000000 },
  { symbol: 'DYDX', name: 'dYdX', price: 3.42, change: 5.67, volume: 125000000, marketCap: 856000000 },
  { symbol: 'SOL', name: 'Solana', price: 98.23, change: 3.21, volume: 2100000000, marketCap: 41000000000 },
  { symbol: 'AVAX', name: 'Avalanche', price: 35.67, change: -2.15, volume: 780000000, marketCap: 13200000000 },
  { symbol: 'ATOM', name: 'Cosmos', price: 9.87, change: 1.89, volume: 340000000, marketCap: 2890000000 },
];

const mockPortfolio = [
  { symbol: 'BTC', amount: 0.5, value: 22615.06 },
  { symbol: 'ETH', amount: 5.2, value: 15030.34 },
  { symbol: 'DYDX', amount: 1000, value: 3420.00 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('screener');
  const [fromToken, setFromToken] = useState('BTC');
  const [toToken, setToToken] = useState('ETH');
  const [swapAmount, setSwapAmount] = useState('');
  const [notifications, setNotifications] = useState(true);

  const totalPortfolioValue = mockPortfolio.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none"></div>
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10">
        <header className="glass-strong border-b border-white/10 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg neon-glow-cyan flex items-center justify-center">
                  <Icon name="Cpu" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold orbitron text-neon-cyan">CYBER DEX</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="glass hover:glass-strong text-foreground">
                  <Icon name="Bell" size={18} className="mr-2" />
                  Уведомления
                </Button>
                <Button className="bg-gradient-to-r from-primary to-secondary neon-glow-cyan font-semibold">
                  <Icon name="Wallet" size={18} className="mr-2" />
                  Подключить кошелёк
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-strong border-primary/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Общая капитализация</span>
                <Icon name="TrendingUp" size={18} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-neon-cyan">$1.8T</p>
              <p className="text-xs text-green-400 mt-1">+2.4% (24ч)</p>
            </Card>

            <Card className="glass-strong border-secondary/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Объём торгов 24ч</span>
                <Icon name="Activity" size={18} className="text-secondary" />
              </div>
              <p className="text-2xl font-bold text-neon-purple">$89.2B</p>
              <p className="text-xs text-green-400 mt-1">+12.3% (24ч)</p>
            </Card>

            <Card className="glass-strong border-accent/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Мой портфель</span>
                <Icon name="Wallet" size={18} className="text-accent" />
              </div>
              <p className="text-2xl font-bold text-neon-magenta">${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-green-400 mt-1">+5.6% (24ч)</p>
            </Card>

            <Card className="glass-strong border-primary/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Активных трейдеров</span>
                <Icon name="Users" size={18} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-neon-cyan">24.5K</p>
              <p className="text-xs text-green-400 mt-1">+8.1% (24ч)</p>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="glass-strong border border-white/10 p-1">
              <TabsTrigger value="screener" className="data-[state=active]:bg-primary/20 data-[state=active]:text-neon-cyan">
                <Icon name="Search" size={16} className="mr-2" />
                Скринер
              </TabsTrigger>
              <TabsTrigger value="swap" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-neon-purple">
                <Icon name="ArrowLeftRight" size={16} className="mr-2" />
                Обменник
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-accent/20 data-[state=active]:text-neon-magenta">
                <Icon name="PieChart" size={16} className="mr-2" />
                Портфель
              </TabsTrigger>
              <TabsTrigger value="charts" className="data-[state=active]:bg-primary/20 data-[state=active]:text-neon-cyan">
                <Icon name="LineChart" size={16} className="mr-2" />
                Графики
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-neon-purple">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="screener" className="space-y-4">
              <Card className="glass-strong border-primary/30 p-6">
                <h2 className="text-xl font-bold orbitron mb-4 text-neon-cyan">Фильтры рынка</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Минимальная цена</label>
                    <Input type="number" placeholder="0.00" className="glass border-white/20" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Максимальная цена</label>
                    <Input type="number" placeholder="100000" className="glass border-white/20" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Изменение 24ч %</label>
                    <Select>
                      <SelectTrigger className="glass border-white/20">
                        <SelectValue placeholder="Все" />
                      </SelectTrigger>
                      <SelectContent className="glass-strong">
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="positive">Рост (+)</SelectItem>
                        <SelectItem value="negative">Падение (-)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary neon-glow-cyan">
                      <Icon name="Search" size={16} className="mr-2" />
                      Применить
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="glass-strong border-primary/30 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Токен</th>
                        <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Цена</th>
                        <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Изменение 24ч</th>
                        <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Объём</th>
                        <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Капитализация</th>
                        <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTokens.map((token) => (
                        <tr key={token.symbol} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-xs font-bold">
                                {token.symbol.substring(0, 2)}
                              </div>
                              <div>
                                <div className="font-semibold">{token.symbol}</div>
                                <div className="text-xs text-muted-foreground">{token.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-right p-4 font-mono">${token.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="text-right p-4">
                            <Badge variant={token.change >= 0 ? 'default' : 'destructive'} className={token.change >= 0 ? 'bg-green-500/20 text-green-400' : ''}>
                              {token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%
                            </Badge>
                          </td>
                          <td className="text-right p-4 font-mono text-sm">${(token.volume / 1000000000).toFixed(2)}B</td>
                          <td className="text-right p-4 font-mono text-sm">${(token.marketCap / 1000000000).toFixed(2)}B</td>
                          <td className="text-right p-4">
                            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary neon-glow-cyan">
                              <Icon name="ArrowLeftRight" size={14} className="mr-1" />
                              Swap
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="swap" className="space-y-4">
              <Card className="glass-strong border-secondary/30 p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold orbitron mb-6 text-neon-purple text-center">Обмен токенов</h2>
                
                <div className="space-y-4">
                  <div className="glass p-4 rounded-lg border border-white/10">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Отдаёте</span>
                      <span className="text-sm text-muted-foreground">Баланс: 0.00</span>
                    </div>
                    <div className="flex gap-3">
                      <Select value={fromToken} onValueChange={setFromToken}>
                        <SelectTrigger className="w-32 glass border-white/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-strong">
                          {mockTokens.map(t => (
                            <SelectItem key={t.symbol} value={t.symbol}>{t.symbol}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        value={swapAmount}
                        onChange={(e) => setSwapAmount(e.target.value)}
                        className="glass border-white/20 text-xl font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button size="icon" className="glass-strong rounded-full neon-glow-purple">
                      <Icon name="ArrowDownUp" size={20} className="text-neon-purple" />
                    </Button>
                  </div>

                  <div className="glass p-4 rounded-lg border border-white/10">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Получаете</span>
                      <span className="text-sm text-muted-foreground">Баланс: 0.00</span>
                    </div>
                    <div className="flex gap-3">
                      <Select value={toToken} onValueChange={setToToken}>
                        <SelectTrigger className="w-32 glass border-white/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-strong">
                          {mockTokens.map(t => (
                            <SelectItem key={t.symbol} value={t.symbol}>{t.symbol}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="glass border-white/20 text-xl font-mono"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="glass p-4 rounded-lg border border-white/10 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Курс обмена</span>
                      <span className="font-mono">1 {fromToken} = 15.64 {toToken}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Комиссия сети</span>
                      <span className="font-mono text-yellow-400">~$2.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Проскальзывание</span>
                      <span className="font-mono text-green-400">0.5%</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-secondary to-accent neon-glow-purple py-6 text-lg font-bold">
                    <Icon name="Zap" size={20} className="mr-2" />
                    Выполнить обмен
                  </Button>
                </div>
              </Card>

              <Card className="glass-strong border-secondary/30 p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold orbitron mb-4 text-neon-purple">История обменов</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-3 glass rounded border border-white/5">
                    <div className="flex gap-2 items-center">
                      <Icon name="ArrowRight" size={14} className="text-primary" />
                      <span>0.5 BTC → 7.82 ETH</span>
                    </div>
                    <span className="text-muted-foreground">2 часа назад</span>
                  </div>
                  <div className="flex justify-between p-3 glass rounded border border-white/5">
                    <div className="flex gap-2 items-center">
                      <Icon name="ArrowRight" size={14} className="text-secondary" />
                      <span>100 DYDX → 342 USDC</span>
                    </div>
                    <span className="text-muted-foreground">5 часов назад</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4">
              <Card className="glass-strong border-accent/30 p-6">
                <h2 className="text-2xl font-bold orbitron mb-6 text-neon-magenta">Мой портфель</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="glass p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">Общая стоимость</div>
                    <div className="text-3xl font-bold text-neon-magenta">${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div className="glass p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">Изменение 24ч</div>
                    <div className="text-3xl font-bold text-green-400">+$2,301.45</div>
                  </div>
                  <div className="glass p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">Процент роста</div>
                    <div className="text-3xl font-bold text-green-400">+5.6%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {mockPortfolio.map((item) => {
                    const token = mockTokens.find(t => t.symbol === item.symbol);
                    if (!token) return null;
                    const percentage = (item.value / totalPortfolioValue) * 100;
                    
                    return (
                      <div key={item.symbol} className="glass p-4 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center font-bold">
                              {item.symbol.substring(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold">{item.symbol}</div>
                              <div className="text-sm text-muted-foreground">{token.name}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                            <div className="text-sm text-muted-foreground">{item.amount} {item.symbol}</div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{percentage.toFixed(1)}% портфеля</span>
                            <span className="text-green-400">+{token.change}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full neon-glow-cyan"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="charts" className="space-y-4">
              <Card className="glass-strong border-primary/30 p-6">
                <h2 className="text-2xl font-bold orbitron mb-4 text-neon-cyan">Графики цен (IPFS данные)</h2>
                <div className="flex gap-2 mb-6">
                  {['1H', '4H', '1D', '1W', '1M', '1Y'].map((period) => (
                    <Button key={period} variant="outline" size="sm" className="glass border-white/20">
                      {period}
                    </Button>
                  ))}
                </div>
                <div className="glass-strong rounded-lg border border-white/10 p-8 flex items-center justify-center h-96">
                  <div className="text-center">
                    <Icon name="LineChart" size={64} className="mx-auto mb-4 text-primary opacity-50" />
                    <p className="text-muted-foreground">График будет загружен из IPFS Kubo</p>
                    <p className="text-sm text-muted-foreground mt-2">Исторические данные рынка в децентрализованном хранилище</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="glass-strong border-secondary/30 p-6 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold orbitron mb-6 text-neon-purple">Настройки</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Wallet" size={20} className="text-primary" />
                      Кошелёк
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 glass rounded-lg border border-white/10">
                        <span>Подключён</span>
                        <Badge variant="outline" className="text-red-400 border-red-400">Не подключён</Badge>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary neon-glow-cyan">
                        <Icon name="Link" size={16} className="mr-2" />
                        Подключить MetaMask
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Bell" size={20} className="text-accent" />
                      Уведомления
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 glass rounded-lg border border-white/10">
                        <div>
                          <div className="font-medium">Push-уведомления</div>
                          <div className="text-sm text-muted-foreground">Получать оповещения об изменениях цен</div>
                        </div>
                        <Switch checked={notifications} onCheckedChange={setNotifications} />
                      </div>
                      <div className="flex justify-between items-center p-4 glass rounded-lg border border-white/10">
                        <div>
                          <div className="font-medium">Email-уведомления</div>
                          <div className="text-sm text-muted-foreground">Ежедневный отчёт на почту</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Sliders" size={20} className="text-secondary" />
                      Торговля
                    </h3>
                    <div className="space-y-4">
                      <div className="glass p-4 rounded-lg border border-white/10">
                        <label className="text-sm font-medium mb-2 block">Проскальзывание (%)</label>
                        <Slider defaultValue={[0.5]} max={5} step={0.1} className="mb-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0%</span>
                          <span className="text-green-400">0.5%</span>
                          <span>5%</span>
                        </div>
                      </div>
                      <div className="glass p-4 rounded-lg border border-white/10">
                        <label className="text-sm font-medium mb-2 block">Приоритет газа</label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="glass border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="glass-strong">
                            <SelectItem value="low">Низкий</SelectItem>
                            <SelectItem value="medium">Средний</SelectItem>
                            <SelectItem value="high">Высокий</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <footer className="glass-strong border-t border-white/10 mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded neon-glow-cyan"></div>
                <span className="text-sm text-muted-foreground">CYBER DEX v4.0 | Powered by dYdX & IPFS Kubo</span>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Icon name="FileText" size={14} className="mr-1" />
                  Документация
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Icon name="Shield" size={14} className="mr-1" />
                  Безопасность
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Icon name="Github" size={14} className="mr-1" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
