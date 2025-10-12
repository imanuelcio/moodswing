import { Activity } from "lucide-react";
import CodeBlock from "../CodeBlock";

// ==================== SECTION: WEBSOCKET ====================
const WebSocketSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Activity className="h-6 w-6 text-primary" />
      <h2 className="text-3xl font-orbitron font-bold">WebSocket API</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <p className="text-muted-foreground">
        Subscribe to real-time market updates, price changes, and sentiment
        scores via WebSocket connection.
      </p>

      <div>
        <h4 className="text-sm font-semibold mb-2">Connection</h4>
        <CodeBlock
          id="ws-connect"
          language="javascript"
          code={`const ws = new WebSocket('wss://api.moodswing.fi/v1/stream');

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'YOUR_API_KEY'
  }));
  
  // Subscribe to market updates
  ws.send(JSON.stringify({
    type: 'subscribe',
    channels: ['markets', 'sentiment:bitcoin']
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};`}
        />
      </div>
    </div>
  </div>
);

export default WebSocketSection;
