import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import ConceptTooltip from "./ConceptTooltip";
import { Calculator } from "lucide-react";

export interface SimulationData {
  initialValue: number;
  timeInYears: number;
  strategy: "conservative" | "moderate" | "aggressive";
  diversified: boolean;
}

interface InvestmentFormProps {
  onSimulate: (data: SimulationData) => void;
}

const InvestmentForm = ({ onSimulate }: InvestmentFormProps) => {
  const [initialValue, setInitialValue] = useState("10000");
  const [timeInYears, setTimeInYears] = useState("5");
  const [strategy, setStrategy] = useState<SimulationData["strategy"]>("moderate");
  const [diversified, setDiversified] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSimulate({
      initialValue: parseFloat(initialValue),
      timeInYears: parseFloat(timeInYears),
      strategy,
      diversified,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="initial-value" className="text-base font-medium">
            Valor Inicial (R$)
          </Label>
          <Input
            id="initial-value"
            type="number"
            min="100"
            step="100"
            value={initialValue}
            onChange={(e) => setInitialValue(e.target.value)}
            className="text-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-base font-medium">
            Tempo de Aplicação (anos)
          </Label>
          <Input
            id="time"
            type="number"
            min="1"
            max="30"
            step="1"
            value={timeInYears}
            onChange={(e) => setTimeInYears(e.target.value)}
            className="text-lg"
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Estratégia de Investimento</Label>
          <RadioGroup value={strategy} onValueChange={(value) => setStrategy(value as SimulationData["strategy"])}>
            <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <RadioGroupItem value="conservative" id="conservative" className="mt-1" />
              <div className="space-y-1 flex-1">
                <Label htmlFor="conservative" className="text-base font-medium cursor-pointer">
                  Conservador
                </Label>
                <p className="text-sm text-muted-foreground">
                  Renda fixa, baixo risco. Retorno médio: 8-10% ao ano.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <RadioGroupItem value="moderate" id="moderate" className="mt-1" />
              <div className="space-y-1 flex-1">
                <Label htmlFor="moderate" className="text-base font-medium cursor-pointer">
                  Moderado
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ações estáveis + renda fixa. Retorno médio: 12-18% ao ano.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <RadioGroupItem value="aggressive" id="aggressive" className="mt-1" />
              <div className="space-y-1 flex-1">
                <Label htmlFor="aggressive" className="text-base font-medium cursor-pointer">
                  Agressivo
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ações voláteis, alto risco. Retorno médio: 20-30% ao ano (alta volatilidade).
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
          <div className="space-y-1">
            <Label htmlFor="diversified" className="text-base font-medium cursor-pointer">
              <ConceptTooltip title="Diversificação">
                <p className="font-semibold text-foreground">O que é?</p>
                <p className="text-sm text-muted-foreground">
                  Diversificar significa distribuir seu investimento em diferentes ativos (ações, títulos, etc.) 
                  para reduzir o risco total. Se um ativo cai, outros podem compensar a perda.
                </p>
              </ConceptTooltip>
            </Label>
            <p className="text-sm text-muted-foreground">
              Reduz o risco distribuindo investimentos
            </p>
          </div>
          <Switch
            id="diversified"
            checked={diversified}
            onCheckedChange={setDiversified}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full">
        <Calculator className="mr-2 h-5 w-5" />
        Simular Investimento
      </Button>
    </form>
  );
};

export default InvestmentForm;
