import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitFeedback } from "@/lib/api";

const eventTypes = ["Workshop", "Guest Lecture", "Club Meeting", "Social Event", "Conference", "Other"];

const FeedbackForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventName: "",
    eventType: "",
    rating: 0,
    comments: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, eventType: value });
  };

  const handleRating = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitFeedback(formData);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your valuable feedback!",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        eventName: "",
        eventType: "",
        rating: 0,
        comments: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit feedback",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-campus-700">Submit Your Feedback</CardTitle>
        <CardDescription>
          Share your thoughts about a campus event or activity to help us improve.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                name="eventName"
                placeholder="Name of the event"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select value={formData.eventType} onValueChange={handleSelectChange} required>
                <SelectTrigger id="eventType">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <Label>Your Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  type="button"
                  variant={formData.rating >= star ? "default" : "outline"}
                  size="icon"
                  className={formData.rating >= star ? "bg-yellow-400 hover:bg-yellow-500" : ""}
                  onClick={() => handleRating(star)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={formData.rating >= star ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="sr-only">Rating {star}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              name="comments"
              placeholder="Share your experience and suggestions..."
              value={formData.comments}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-campus-600 hover:bg-campus-700" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
