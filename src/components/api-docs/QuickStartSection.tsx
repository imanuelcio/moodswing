import { Zap } from "lucide-react";
import CodeBlock from "../CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// ==================== SECTION: QUICK START ====================
const QuickStartSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Zap className="h-6 w-6 text-primary" />
      <h2 className="text-3xl font-orbitron font-bold">Quick Start</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-2">1. Obtain Your API Key</h3>
        <p className="text-muted-foreground mb-4">
          Sign up and generate your API key from the dashboard. Keep it secure
          and never expose it in client-side code.
        </p>
        <CodeBlock
          id="api-key"
          language="bash"
          code={`# Set your API key as an environment variable
export MOODSWING_API_KEY="ms_live_abc123xyz..."`}
        />
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">
          2. Make Your First Request
        </h3>
        <p className="text-muted-foreground mb-4">
          All API requests require authentication via the Authorization header.
        </p>
        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="curl">cURL</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="go">Go</TabsTrigger>
          </TabsList>
          <TabsContent value="curl" className="mt-4">
            <CodeBlock
              id="curl-example"
              language="bash"
              code={`curl -X GET "https://api.moodswing.fi/v1/markets" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
            />
          </TabsContent>
          <TabsContent value="js" className="mt-4">
            <CodeBlock
              id="js-example"
              language="javascript"
              code={`const response = await fetch('https://api.moodswing.fi/v1/markets', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
console.log(data);`}
            />
          </TabsContent>
          <TabsContent value="python" className="mt-4">
            <CodeBlock
              id="python-example"
              language="python"
              code={`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.moodswing.fi/v1/markets', headers=headers)
data = response.json()
print(data)`}
            />
          </TabsContent>
          <TabsContent value="go" className="mt-4">
            <CodeBlock
              id="go-example"
              language="go"
              code={`package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://api.moodswing.fi/v1/markets", nil)
    req.Header.Add("Authorization", "Bearer YOUR_API_KEY")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)
    fmt.Println(string(body))
}`}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
);

export default QuickStartSection;
