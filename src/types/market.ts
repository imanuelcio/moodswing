export interface IMarketsResponse {
  markets: Market[];
  pagination: Pagination;
}

export interface Market {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  source: string;
  settlement_type: string;
  status: string;
  open_at: string;
  close_at: string;
  resolve_by: string;
  creator_user_id: any;
  metadata: Metadata;
  created_at: string;
  symbol: string;
  pyth_price_id: string;
  resolution_rule: ResolutionRule;
  visibility: string;
  tags: any;
  market_outcomes: MarketOutcome[];
}

export interface Metadata {
  difficulty: string;
  reward_points: number;
}

export interface ResolutionRule {
  method: string;
  grace_sec?: number;
  threshold?: number;
  comparator?: string;
  ranges?: Range[];
}

export interface Range {
  max: number;
  min: number;
  code: string;
}

export interface MarketOutcome {
  id: number;
  key: string;
  name: string;
  market_id: number;
  created_at: string;
  initial_price: any;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
