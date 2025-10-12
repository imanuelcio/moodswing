import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { LeftNav } from "@/components/LeftNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Create = () => {
  const [outcomes, setOutcomes] = useState([
    { key: "yes", name: "Yes", initialPrice: 0.5 },
    { key: "no", name: "No", initialPrice: 0.5 },
  ]);

  const addOutcome = () => {
    setOutcomes([
      ...outcomes,
      { key: `outcome_${outcomes.length}`, name: "", initialPrice: 0.5 },
    ]);
  };

  const removeOutcome = (index: number) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // POST /markets - mock
    toast.success("Market created!", {
      description: "Your prediction market is now live",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="flex">
        <LeftNav />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
              <h1 className="font-orbitron text-4xl font-bold text-glow-red mb-2">
                Create Market
              </h1>
              <p className="text-muted-foreground">
                Set up a new prediction market
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="glass-card border-border">
                <CardHeader>
                  <CardTitle className="font-orbitron">
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Market Title</Label>
                    <Input
                      id="title"
                      placeholder="Will Bitcoin reach $100k by end of 2025?"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed resolution criteria..."
                      className="mt-1"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select required>
                        <SelectTrigger id="category" className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crypto">Crypto</SelectItem>
                          <SelectItem value="politics">Politics</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="culture">Culture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="settlement">Settlement Type</Label>
                      <Select required>
                        <SelectTrigger id="settlement" className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="binary">
                            Binary (Yes/No)
                          </SelectItem>
                          <SelectItem value="multi">Multiple Choice</SelectItem>
                          <SelectItem value="scalar">Scalar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="openAt">Open At</Label>
                      <Input
                        id="openAt"
                        type="datetime-local"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="closeAt">Close At</Label>
                      <Input
                        id="closeAt"
                        type="datetime-local"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="resolveBy">Resolve By</Label>
                      <Input
                        id="resolveBy"
                        type="datetime-local"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-orbitron">Outcomes</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOutcome}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Outcome
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-end gap-3">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`outcome-name-${index}`}>Name</Label>
                          <Input
                            id={`outcome-name-${index}`}
                            placeholder="Yes"
                            value={outcome.name}
                            onChange={(e) => {
                              const newOutcomes = [...outcomes];
                              newOutcomes[index].name = e.target.value;
                              setOutcomes(newOutcomes);
                            }}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`outcome-price-${index}`}>
                            Initial Price
                          </Label>
                          <Input
                            id={`outcome-price-${index}`}
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            value={outcome.initialPrice}
                            onChange={(e) => {
                              const newOutcomes = [...outcomes];
                              newOutcomes[index].initialPrice = parseFloat(
                                e.target.value
                              );
                              setOutcomes(newOutcomes);
                            }}
                            className="mt-1 font-mono"
                            required
                          />
                        </div>
                      </div>
                      {outcomes.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOutcome(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" size="lg">
                Create Market
              </Button>
            </form>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Create;
