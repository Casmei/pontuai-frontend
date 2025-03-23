"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

// Mock data
const rewards = [
  {
    id: 1,
    name: "10% Discount",
    points: 100,
    description: "10% off your next purchase",
  },
  {
    id: 2,
    name: "Free Ice Cream",
    points: 150,
    description: "One free ice cream of your choice",
  },
  {
    id: 3,
    name: "Gift Card",
    points: 300,
    description: "$30 gift card for any store",
  },
  {
    id: 4,
    name: "Premium Item",
    points: 500,
    description: "Select a premium clothing item",
  },
];

export default function RewardsPage() {
  const [rewardsList, setRewardsList] = useState(rewards);
  const [newReward, setNewReward] = useState({
    name: "",
    points: "",
    description: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddReward = () => {
    if (newReward.name && newReward.points && newReward.description) {
      const reward = {
        id: rewardsList.length + 1,
        name: newReward.name,
        points: Number.parseInt(newReward.points),
        description: newReward.description,
      };

      setRewardsList([...rewardsList, reward]);
      setNewReward({ name: "", points: "", description: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gerir Recompensas</CardTitle>
            <CardDescription>
              Configurar os prémios disponíveis para os clientes
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar recompensa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar nova recompensa</DialogTitle>
                <DialogDescription>
                  Criar uma nova opção de recompensa para os clientes resgatarem
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="reward-name">Nome da recompensa</Label>
                  <Input
                    id="reward-name"
                    placeholder="Enter reward name"
                    value={newReward.name}
                    onChange={(e) =>
                      setNewReward({ ...newReward, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward-points">Pontos necessários</Label>
                  <Input
                    id="reward-points"
                    type="number"
                    min="1"
                    value={newReward.points}
                    onChange={(e) =>
                      setNewReward({ ...newReward, points: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward-description"></Label>
                  <Input
                    id="reward-description"
                    placeholder="Enter reward description"
                    value={newReward.description}
                    onChange={(e) =>
                      setNewReward({
                        ...newReward,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddReward}>
                  Criar recompensa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da recompensa</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Pontos necessários</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rewardsList.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell className="font-medium">{reward.name}</TableCell>
                  <TableCell>{reward.description}</TableCell>
                  <TableCell>{reward.points}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
