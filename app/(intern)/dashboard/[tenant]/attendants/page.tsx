"use client";

import { useState } from "react";
import { Plus, Search, Pencil, Trash } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data for attendants
const initialAttendants = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria@example.com",
    phone: "(555) 123-4567",
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao@example.com",
    phone: "(555) 987-6543",
  },
  {
    id: 3,
    name: "Ana Oliveira",
    email: "ana@example.com",
    phone: "(555) 456-7890",
  },
];

export default function AttendantsPage() {
  const { toast } = useToast();
  const [attendants, setAttendants] = useState(initialAttendants);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newAttendant, setNewAttendant] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editingAttendant, setEditingAttendant] = useState<null | {
    id: number;
    name: string;
    email: string;
    phone: string;
  }>(null);

  const filteredAttendants = attendants.filter(
    (attendant) =>
      attendant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendant.phone.includes(searchQuery),
  );

  const handleAddAttendant = () => {
    if (newAttendant.name && newAttendant.email && newAttendant.phone) {
      const attendant = {
        id: attendants.length + 1,
        name: newAttendant.name,
        email: newAttendant.email,
        phone: newAttendant.phone,
      };

      setAttendants([...attendants, attendant]);
      setNewAttendant({ name: "", email: "", phone: "" });
      setIsAddDialogOpen(false);

      toast({
        title: "Attendant added",
        description: `${attendant.name} has been added successfully.`,
      });
    }
  };

  const handleEditAttendant = () => {
    if (
      editingAttendant &&
      editingAttendant.name &&
      editingAttendant.email &&
      editingAttendant.phone
    ) {
      setAttendants(
        attendants.map((attendant) =>
          attendant.id === editingAttendant.id ? editingAttendant : attendant,
        ),
      );
      setIsEditDialogOpen(false);

      toast({
        title: "Attendant updated",
        description: `${editingAttendant.name}'s information has been updated.`,
      });
    }
  };

  const handleDeleteAttendant = (id: number) => {
    setAttendants(attendants.filter((attendant) => attendant.id !== id));

    toast({
      title: "Attendant removed",
      description: "The attendant has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Atendentes</CardTitle>
            <CardDescription>
              Gerir os atendentes e as suas informações
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar atendente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar novo atendente</DialogTitle>
                <DialogDescription>
                  Adicionar um novo atendente ao sistema do programa de
                  fidelidade.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Enter attendant name"
                    value={newAttendant.name}
                    onChange={(e) =>
                      setNewAttendant({ ...newAttendant, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter attendant email"
                    value={newAttendant.email}
                    onChange={(e) =>
                      setNewAttendant({
                        ...newAttendant,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de telefone</Label>
                  <Input
                    id="phone"
                    placeholder="Enter attendant phone"
                    value={newAttendant.phone}
                    onChange={(e) =>
                      setNewAttendant({
                        ...newAttendant,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={handleAddAttendant}
                  disabled={
                    !newAttendant.name ||
                    !newAttendant.email ||
                    !newAttendant.phone
                  }
                >
                  Adicionar atendente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendants.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-4 text-muted-foreground"
                  >
                    Nenhum atendente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredAttendants.map((attendant) => (
                  <TableRow key={attendant.id}>
                    <TableCell className="font-medium">
                      {attendant.name}
                    </TableCell>
                    <TableCell>{attendant.email}</TableCell>
                    <TableCell>{attendant.phone}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={
                            isEditDialogOpen &&
                            editingAttendant?.id === attendant.id
                          }
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (!open) setEditingAttendant(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingAttendant(attendant)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar atendente</DialogTitle>
                              <DialogDescription>
                                Atualizar as informações do atendente
                              </DialogDescription>
                            </DialogHeader>
                            {editingAttendant && (
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">
                                    Nome completo
                                  </Label>
                                  <Input
                                    id="edit-name"
                                    value={editingAttendant.name}
                                    onChange={(e) =>
                                      setEditingAttendant({
                                        ...editingAttendant,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-email">Email</Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    value={editingAttendant.email}
                                    onChange={(e) =>
                                      setEditingAttendant({
                                        ...editingAttendant,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-phone">Celular</Label>
                                  <Input
                                    id="edit-phone"
                                    value={editingAttendant.phone}
                                    onChange={(e) =>
                                      setEditingAttendant({
                                        ...editingAttendant,
                                        phone: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button
                                type="button"
                                onClick={handleEditAttendant}
                                disabled={
                                  !editingAttendant?.name ||
                                  !editingAttendant?.email ||
                                  !editingAttendant?.phone
                                }
                              >
                                Atualizar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Deletar atendente
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem a certeza de que pretende remover{" "}
                                {attendant.name}? Esta ação não pode ser
                                desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteAttendant(attendant.id)
                                }
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Remover
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
