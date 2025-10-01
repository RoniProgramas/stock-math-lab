import { useMemo } from "react";
import { SimulationData } from "./InvestmentForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import ConceptTooltip from "./ConceptTooltip";

interface SimulationResultsProps {
  data: SimulationData;
}

const SimulationResults = ({ data }: SimulationResultsProps) => {
  const simulation = useMemo(() => {
    const { initialValue, timeInYears, strategy, diversified } = data;

    // Taxas base de retorno anual
    const baseRates = {
      conservative: 0.09,
      moderate: 0.15,
      aggressive: 0.25,
    };

    // Volatilidade (desvio padrão anual)
    const volatility = {
      conservative: 0.02,
      moderate: 0.08,
      aggressive: 0.15,
    };

    const baseRate = baseRates[strategy];
    const vol = diversified ? volatility[strategy] * 0.7 : volatility[strategy];

    // Gerar dados mensais
    const months = timeInYears * 12;
    const chartData = [];
    let currentValue = initialValue;
    let alternativeValue = initialValue;

    // Estratégia alternativa (sempre conservadora para comparação)
    const altRate = baseRates.conservative;
    const altVol = volatility.conservative * (diversified ? 0.7 : 1);

    for (let i = 0; i <= months; i++) {
      if (i === 0) {
        chartData.push({
          month: 0,
          value: initialValue,
          alternative: initialValue,
        });
        continue;
      }

      // Simular retorno mensal com volatilidade (usando Box-Muller para distribuição normal)
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      
      const monthlyReturn = baseRate / 12 + (vol / Math.sqrt(12)) * z0;
      const altMonthlyReturn = altRate / 12 + (altVol / Math.sqrt(12)) * z0;

      currentValue = currentValue * (1 + monthlyReturn);
      alternativeValue = alternativeValue * (1 + altMonthlyReturn);

      chartData.push({
        month: i,
        value: Math.round(currentValue),
        alternative: Math.round(alternativeValue),
      });
    }

    const finalValue = chartData[chartData.length - 1].value;
    const altFinalValue = chartData[chartData.length - 1].alternative;
    const totalReturn = ((finalValue - initialValue) / initialValue) * 100;
    const altTotalReturn = ((altFinalValue - initialValue) / initialValue) * 100;

    // Calcular probabilidade de ganho (simplificado)
    const gainProbability = strategy === "conservative" ? 95 : strategy === "moderate" ? 75 : 60;

    return {
      chartData,
      finalValue,
      altFinalValue,
      totalReturn,
      altTotalReturn,
      gainProbability,
      strategyName: strategy === "conservative" ? "Conservador" : strategy === "moderate" ? "Moderado" : "Agressivo",
    };
  }, [data]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Valor Final</CardDescription>
            <CardTitle className="text-2xl">
              R$ {simulation.finalValue.toLocaleString("pt-BR")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {simulation.totalReturn >= 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-loss" />
              )}
              <span className={simulation.totalReturn >= 0 ? "text-success" : "text-loss"}>
                {simulation.totalReturn > 0 ? "+" : ""}
                {simulation.totalReturn.toFixed(2)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Lucro/Prejuízo</CardDescription>
            <CardTitle className="text-2xl">
              R$ {(simulation.finalValue - data.initialValue).toLocaleString("pt-BR")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Investimento inicial: R$ {data.initialValue.toLocaleString("pt-BR")}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>
              <ConceptTooltip title="Probabilidade de Ganho">
                <p className="font-semibold text-foreground">O que significa?</p>
                <p className="text-sm text-muted-foreground">
                  É a chance estimada de obter retorno positivo com base no perfil de risco escolhido. 
                  Investimentos conservadores têm maior probabilidade, mas menor retorno potencial.
                </p>
              </ConceptTooltip>
            </CardDescription>
            <CardTitle className="text-2xl">{simulation.gainProbability}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Perfil: {simulation.strategyName}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <ConceptTooltip title="Evolução do Investimento">
              <p className="font-semibold text-foreground">Juros Compostos em ação</p>
              <p className="text-sm text-muted-foreground">
                Os juros compostos fazem seu dinheiro crescer exponencialmente: você ganha juros sobre os juros. 
                Por isso a curva não é uma reta, mas sim uma curva crescente acelerada.
              </p>
            </ConceptTooltip>
          </CardTitle>
          <CardDescription>
            Comparação: {simulation.strategyName} vs Conservador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={simulation.chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                label={{ value: "Meses", position: "insideBottom", offset: -5 }}
                className="text-muted-foreground"
              />
              <YAxis 
                label={{ value: "Valor (R$)", angle: -90, position: "insideLeft" }}
                className="text-muted-foreground"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
                formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name={simulation.strategyName}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="alternative" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Conservador"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparação de Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
              <div>
                <p className="font-medium">{simulation.strategyName}</p>
                <p className="text-sm text-muted-foreground">Sua estratégia escolhida</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">R$ {simulation.finalValue.toLocaleString("pt-BR")}</p>
                <p className={`text-sm ${simulation.totalReturn >= 0 ? "text-success" : "text-loss"}`}>
                  {simulation.totalReturn > 0 ? "+" : ""}{simulation.totalReturn.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Conservador</p>
                <p className="text-sm text-muted-foreground">Estratégia alternativa</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">R$ {simulation.altFinalValue.toLocaleString("pt-BR")}</p>
                <p className={`text-sm ${simulation.altTotalReturn >= 0 ? "text-success" : "text-loss"}`}>
                  {simulation.altTotalReturn > 0 ? "+" : ""}{simulation.altTotalReturn.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Análise:</span>{" "}
                {simulation.finalValue > simulation.altFinalValue 
                  ? `A estratégia ${simulation.strategyName.toLowerCase()} rendeu R$ ${(simulation.finalValue - simulation.altFinalValue).toLocaleString("pt-BR")} a mais que a conservadora, mas com maior risco e volatilidade.`
                  : `A estratégia conservadora foi mais rentável nesta simulação, demonstrando a importância de considerar o risco vs retorno.`
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conceitos Importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <ConceptTooltip title="Volatilidade">
              <p className="font-semibold text-foreground">Volatilidade</p>
              <p className="text-sm text-muted-foreground">
                Mede o quanto o preço de um ativo varia ao longo do tempo. Alta volatilidade = maior risco, mas também maior potencial de ganho.
              </p>
            </ConceptTooltip>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <ConceptTooltip title="Risco vs Retorno">
              <p className="font-semibold text-foreground">Risco vs Retorno</p>
              <p className="text-sm text-muted-foreground">
                Quanto maior o risco, maior o retorno potencial (e maior a chance de perda). Investimentos seguros geralmente têm retornos menores.
              </p>
            </ConceptTooltip>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationResults;
