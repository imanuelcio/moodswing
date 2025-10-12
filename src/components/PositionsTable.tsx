import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Position {
  id: string;
  marketTitle: string;
  outcome: string;
  direction: "BUY" | "SELL";
  avgPrice: number;
  quantity: number;
  currentPrice: number;
  pnl: number;
}

interface PositionsTableProps {
  positions: Position[];
}

export const PositionsTable = ({ positions }: PositionsTableProps) => {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Market</TableHead>
            <TableHead>Outcome</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Avg Price</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Current</TableHead>
            <TableHead className="text-right">PnL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((pos) => (
            <TableRow key={pos.id} className="hover:bg-primary/5">
              <TableCell className="font-medium">{pos.marketTitle}</TableCell>
              <TableCell>{pos.outcome}</TableCell>
              <TableCell>
                <Badge
                  variant={pos.direction === "BUY" ? "default" : "secondary"}
                >
                  {pos.direction}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-mono">
                {(pos.avgPrice * 100).toFixed(1)}¢
              </TableCell>
              <TableCell className="text-right font-mono">
                {pos.quantity}
              </TableCell>
              <TableCell className="text-right font-mono">
                {(pos.currentPrice * 100).toFixed(1)}¢
              </TableCell>
              <TableCell className="text-right">
                <div
                  className={`flex items-center justify-end gap-1 ${
                    pos.pnl >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {pos.pnl >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span className="font-mono">
                    {pos.pnl >= 0 ? "+" : ""}
                    {pos.pnl.toFixed(2)} pts
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
