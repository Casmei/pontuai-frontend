"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    pointsRatio: "1",
    dollarAmount: "1",
    expiration: "365",
    minRedemption: "100",
  });

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description:
        "As definições do seu programa de fidelização foram actualizadas.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
        <CardDescription>
          Configurar definições do programa de fidelização
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="points-ratio">Razão da pontuação</Label>
          <div className="flex items-center gap-2">
            <Input
              id="points-ratio"
              value={settings.pointsRatio}
              onChange={(e) =>
                setSettings({ ...settings, pointsRatio: e.target.value })
              }
              className="w-20"
            />
            <span>ponto(s) por</span>
            <Input
              value={settings.dollarAmount}
              onChange={(e) =>
                setSettings({ ...settings, dollarAmount: e.target.value })
              }
              className="w-20"
            />
            <span>reais gastos</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiration">Expiração dos pontos</Label>
          <Select
            value={settings.expiration}
            onValueChange={(value) =>
              setSettings({ ...settings, expiration: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Nunca</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
              <SelectItem value="180">180 dias</SelectItem>
              <SelectItem value="365">1 ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="min-redemption">Pontos mínimos para resgate</Label>
          <Input
            id="min-redemption"
            value={settings.minRedemption}
            onChange={(e) =>
              setSettings({ ...settings, minRedemption: e.target.value })
            }
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>Salvar configurações</Button>
      </CardFooter>
    </Card>
  );
}
