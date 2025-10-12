import { AlertCircle, Lock } from "lucide-react";
import CodeBlock from "../CodeBlock";

// ==================== SECTION: AUTHENTICATION ====================
const AuthenticationSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Lock className="h-6 w-6 text-primary" />
      <h2 className="text-3xl font-orbitron font-bold">Authentication</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <p className="text-muted-foreground">
        The Mood Swing API uses API keys to authenticate requests. You can view
        and manage your API keys in the Dashboard.
      </p>

      <div className="space-y-3">
        <h4 className="font-semibold">API Key Format</h4>
        <CodeBlock
          id="auth-format"
          language="bash"
          code={`Authorization: Bearer ms_live_abc123xyz...`}
        />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-semibold text-amber-500">
              Security Best Practices
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Never expose API keys in client-side code</li>
              <li>• Use environment variables to store keys</li>
              <li>• Rotate keys regularly</li>
              <li>• Use different keys for development and production</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AuthenticationSection;
