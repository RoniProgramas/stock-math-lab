import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InvestmentForm, { SimulationData } from "@/components/InvestmentForm";
import SimulationResults from "@/components/SimulationResults";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp } from "lucide-react";

const Simulator = () => {
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);

  const handleSimulate = (data: SimulationData) => {
    setSimulationData(data);
    // Scroll to results smoothly
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 text-primary text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>Ferramenta Educativa</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Simulador de Investimentos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Configure seus parâmetros e descubra como diferentes estratégias 
              impactam o crescimento do seu investimento
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Configure sua Simulação</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para calcular o potencial retorno do seu investimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InvestmentForm onSimulate={handleSimulate} />
              </CardContent>
            </Card>

            <div>
              {simulationData ? (
                <div id="results">
                  <SimulationResults data={simulationData} />
                </div>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Aguardando simulação</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Preencha o formulário ao lado e clique em "Simular Investimento" 
                      para ver os resultados detalhados
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Simulator;
