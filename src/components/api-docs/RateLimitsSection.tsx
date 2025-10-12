import { Check, Shield } from "lucide-react";
import { Button } from "../ui/button";
import CodeBlock from "../CodeBlock";
import { Badge } from "../ui/badge";

// ==================== SECTION: RATE LIMITS ====================
const RateLimitsSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Shield className="h-6 w-6 text-primary" />
      <h2 className="text-3xl font-orbitron font-bold">
        Rate Limits & Pricing
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          tier: "Free",
          price: "$0/mo",
          requests: "1,000/day",
          features: [
            "REST API access",
            "Basic sentiment data",
            "Community support",
          ],
        },
        {
          tier: "Pro",
          price: "$99/mo",
          requests: "50,000/day",
          features: [
            "REST + WebSocket API",
            "Advanced analytics",
            "Priority support",
            "Custom alerts",
          ],
          popular: true,
        },
        {
          tier: "Enterprise",
          price: "Custom",
          requests: "Unlimited",
          features: [
            "Dedicated infrastructure",
            "SLA guarantee (99.9%)",
            "24/7 support",
            "Custom integrations",
            "Volume discounts",
          ],
        },
      ].map((plan) => (
        <div
          key={plan.tier}
          className={`glass-card rounded-xl p-6 border ${
            plan.popular
              ? "border-primary shadow-[0_0_20px_rgba(239,68,68,0.2)]"
              : "border-border"
          }`}
        >
          {plan.popular && (
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/50">
              Most Popular
            </Badge>
          )}
          <h3 className="font-orbitron text-xl font-bold mb-2">{plan.tier}</h3>
          <div className="text-3xl font-bold mb-1">{plan.price}</div>
          <div className="text-sm text-muted-foreground mb-4">
            {plan.requests}
          </div>
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="text-sm flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            className={`w-full ${
              plan.popular
                ? "bg-primary hover:bg-primary/90"
                : "bg-background border border-border"
            }`}
            variant={plan.popular ? "default" : "outline"}
          >
            {plan.tier === "Enterprise" ? "Contact Sales" : "Get Started"}
          </Button>
        </div>
      ))}
    </div>

    <div className="glass-card rounded-xl p-6 border border-border">
      <h3 className="font-semibold text-lg mb-4">Rate Limit Headers</h3>
      <p className="text-muted-foreground mb-4">
        Each API response includes headers with your current rate limit status:
      </p>
      <CodeBlock
        id="rate-limit-headers"
        language="bash"
        code={`X-RateLimit-Limit: 50000
X-RateLimit-Remaining: 49850
X-RateLimit-Reset: 1705334400`}
      />
    </div>
  </div>
);

export default RateLimitsSection;
