import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, ExternalLink, Calendar, Heart } from "lucide-react";
import { Layout } from "@/components/Layout";

const CommunityPage = () => {
  return (
    <Layout>
      {/* Community Features */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Join Community */}
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <MessageCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                Join Our Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect with fellow Chassidic community members, share dates, and stay updated on important events.
              </p>
              <Button 
                className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300"
                asChild
              >
                <a href="https://discord.gg/chassidic-community" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Discord
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Share Dates */}
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                Share Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Share your important dates with the community and discover meaningful dates from others.
              </p>
              <Button 
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Heart className="w-4 h-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* Community Events */}
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                Community Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Stay updated on community events, gatherings, and special occasions.
              </p>
              <Button 
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Community Guidelines */}
        <Card className="mt-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              Community Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Respect and kindness towards all community members</p>
              <p>• Share meaningful and relevant dates and events</p>
              <p>• Maintain the spiritual and cultural values of our community</p>
              <p>• Help others discover important dates and traditions</p>
            </div>
          </CardContent>
        </Card>
      </Layout>
    );
};

export default CommunityPage; 