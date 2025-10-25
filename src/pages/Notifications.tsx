// import { LeftNav } from "@/components/LeftNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCheck, TrendingUp, Award, AlertCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

const Notifications = () => {
  // Mock data - replace with React Query GET /notifications
  const notifications = [
    {
      id: "1",
      type: "bet_won",
      title: "Bet Won!",
      message: "Your bet on 'Bitcoin $100k' has won. +120 points",
      timestamp: "2 hours ago",
      read: false,
      icon: TrendingUp,
      color: "text-success",
    },
    {
      id: "2",
      type: "badge",
      title: "New Badge Earned",
      message: "You've earned the 'Hot Streak' badge for 5 wins in a row!",
      timestamp: "5 hours ago",
      read: false,
      icon: Award,
      color: "text-primary",
    },
    {
      id: "3",
      type: "market_closing",
      title: "Market Closing Soon",
      message: "'ETH 2.0 Success' closes in 2 hours",
      timestamp: "8 hours ago",
      read: true,
      icon: AlertCircle,
      color: "text-muted-foreground",
    },
  ];

  const markAllRead = () => {
    // POST /notifications/mark-all-read - mock
    console.log("Mark all read");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="flex">
        {/* <LeftNav /> */}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-orbitron text-4xl font-bold text-glow-red mb-2">
                  Notifications
                </h1>
                <p className="text-muted-foreground">
                  Stay updated with your activity
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={markAllRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
            </div>

            <div className="space-y-3">
              {notifications.map((notif) => {
                const Icon = notif.icon;
                return (
                  <Card
                    key={notif.id}
                    className={`glass-card border-border transition-all cursor-pointer hover:border-primary/30 ${
                      !notif.read ? "border-primary/50" : ""
                    }`}
                  >
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className={`mt-1 ${notif.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-foreground">
                            {notif.title}
                          </h3>
                          {!notif.read && (
                            <Badge variant="default" className="ml-2">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notif.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notif.timestamp}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Notifications;
