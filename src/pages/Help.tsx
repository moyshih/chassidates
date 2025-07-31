import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageCircle, ExternalLink, BookOpen, Calendar, Settings, Plus } from "lucide-react";
import { Layout } from "@/components/Layout";

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I add a new date?",
      answer: "Click the floating '+' button on mobile or the 'Add Event' button on desktop. Fill in the event details and save."
    },
    {
      question: "How do I add Chassidic dates?",
      answer: "Go to the Chassidic Dates page and click 'Add Chassidic Dates' to select from a curated list of important Chassidic events."
    },
    {
      question: "Can I edit or delete dates?",
      answer: "Yes! Each date card has edit and delete buttons. You can modify any details or remove dates you no longer need."
    },
    {
      question: "How do I change the theme?",
      answer: "Open the sidebar menu and go to Settings. You can choose between Light, Dark, or System theme."
    },
    {
      question: "Can I use Hebrew dates?",
      answer: "Yes! You can add Hebrew dates as optional fields when creating events, and set Hebrew as your primary calendar in Settings."
    },
    {
      question: "How do I get reminders?",
      answer: "When adding a new event, enable the reminder option and choose how many days in advance you want to be notified."
    }
  ];

  return (
    <Layout>
      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Button 
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            asChild
          >
            <a href="mailto:support@chassidicdates.com?subject=Contact%20About%20chassidicdates%20Support">
              <Mail className="w-6 h-6" />
              <span>Email Support</span>
            </a>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            asChild
          >
            <a href="https://discord.gg/chassidic-community" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-6 h-6" />
              <span>Join Community</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Settings className="w-6 h-6" />
            <span>Settings</span>
          </Button>
        </div>

        {/* Getting Started */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">1</div>
                  <h3 className="font-medium">Add Your First Date</h3>
                </div>
                <p className="text-sm text-muted-foreground">Click the add button and fill in the event details including title, date, and category.</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">2</div>
                  <h3 className="font-medium">Explore Chassidic Dates</h3>
                </div>
                <p className="text-sm text-muted-foreground">Add important Chassidic dates from our curated collection to enrich your spiritual journey.</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">3</div>
                  <h3 className="font-medium">Customize Settings</h3>
                </div>
                <p className="text-sm text-muted-foreground">Adjust theme, language, and calendar preferences to match your needs.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <HelpCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Layout>
    );
};

export default HelpPage; 