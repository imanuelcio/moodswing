import { AlertCircle } from "lucide-react";
import CodeBlock from "../CodeBlock";

// ==================== SECTION: ERROR HANDLING ====================
const ErrorHandlingSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <AlertCircle className="h-6 w-6 text-primary" />
      <h2 className="text-3xl font-orbitron font-bold">Error Handling</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <p className="text-muted-foreground">
        The API uses conventional HTTP response codes and returns errors in a
        consistent JSON format.
      </p>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">HTTP Status Codes</h4>
        {[
          { code: "200", message: "OK - Request succeeded" },
          { code: "400", message: "Bad Request - Invalid parameters" },
          { code: "401", message: "Unauthorized - Invalid API key" },
          { code: "404", message: "Not Found - Resource doesn't exist" },
          { code: "429", message: "Too Many Requests - Rate limited" },
          {
            code: "500",
            message: "Internal Server Error - Something went wrong",
          },
        ].map((error) => (
          <div
            key={error.code}
            className="flex items-center gap-4 p-3 rounded-lg bg-background/50 border border-border"
          >
            <code className="font-mono font-bold text-primary">
              {error.code}
            </code>
            <span className="text-sm">{error.message}</span>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Error Response Format</h4>
        <CodeBlock
          id="error-format"
          language="json"
          code={`{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or has been revoked",
    "details": {
      "timestamp": "2025-01-15T12:00:00Z",
      "request_id": "req_abc123"
    }
  }
}`}
        />
      </div>
    </div>
  </div>
);

export default ErrorHandlingSection;
