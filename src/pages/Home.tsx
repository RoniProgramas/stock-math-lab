import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calculator, BarChart3, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 text-primary text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>Aprenda matemática financeira na prática</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Simulador de Investimentos na
                <span className="text-primary"> Bolsa de Valores</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Descubra como conceitos matemáticos como juros compostos, volatilidade e diversificação 
                impactam seus investimentos de forma interativa e visual.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/simulator">
                    <Calculator className="mr-2 h-5 w-5" />
                    Iniciar Simulação
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <a href="#features">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Como Funciona
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-muted/30">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                O que você vai aprender
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Entenda conceitos fundamentais da matemática financeira através de simulações práticas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Juros Compostos</CardTitle>
                  <CardDescription>
                    Veja como seu dinheiro cresce exponencialmente ao longo do tempo
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Volatilidade</CardTitle>
                  <CardDescription>
                    Entenda como oscilações de preço afetam o risco do seu investimento
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                    <Calculator className="h-6 w-6 text-success" />
                  </div>
                  <CardTitle>Risco vs Retorno</CardTitle>
                  <CardDescription>
                    Compare diferentes estratégias e seus potenciais de ganho
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-success" />
                  </div>
                  <CardTitle>Diversificação</CardTitle>
                  <CardDescription>
                    Aprenda a reduzir riscos distribuindo seus investimentos
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Como funciona o simulador
              </h2>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <CardTitle>Defina seus parâmetros</CardTitle>
                      <CardDescription className="mt-2">
                        Escolha o valor inicial, tempo de investimento e perfil de risco 
                        (conservador, moderado ou agressivo).
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <CardTitle>Veja os resultados</CardTitle>
                      <CardDescription className="mt-2">
                        Acompanhe gráficos interativos mostrando a evolução do seu investimento 
                        mês a mês, com cálculos baseados em dados reais de mercado.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <CardTitle>Aprenda na prática</CardTitle>
                      <CardDescription className="mt-2">
                        Explore tooltips educativos que explicam cada conceito matemático utilizado, 
                        compare diferentes estratégias e entenda o impacto de cada decisão.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/simulator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Começar Agora
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
