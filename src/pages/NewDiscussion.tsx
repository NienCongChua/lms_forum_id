
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const NewDiscussion = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const addTag = () => {
    if (tagInput.trim() !== '' && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && tagInput === '') {
      setFormData({
        ...formData,
        tags: formData.tags.slice(0, -1)
      });
    }
  };
  
  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your API
    console.log('Form submitted:', formData);
    
    toast({
      title: "Discussion created",
      description: "Your discussion has been posted successfully."
    });
    
    // Navigate to forums page after successful creation
    setTimeout(() => {
      navigate('/forums');
    }, 1500);
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Start a New Discussion</h1>
            <p className="text-muted-foreground">Share your thoughts or questions with the community</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader>
                  <CardTitle>Discussion Details</CardTitle>
                  <CardDescription>
                    Provide information about your discussion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      placeholder="What's your discussion about?" 
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={value => handleSelectChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Discussion</SelectItem>
                        <SelectItem value="question">Questions & Help</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea 
                      id="content" 
                      name="content" 
                      placeholder="Write your thoughts, questions, or insights here..." 
                      rows={8}
                      value={formData.content}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Markdown formatting is supported. Be respectful and follow community guidelines.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => removeTag(tag)}
                            className="h-4 w-4 rounded-full hover:bg-muted-foreground/20 inline-flex items-center justify-center"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="Add tags and press Enter"
                        className="border-0 bg-transparent px-2 py-1 text-sm min-w-[200px] flex-grow focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add up to 5 tags to categorize your discussion
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    This is how your discussion will look
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold">
                      {formData.title || 'Your discussion title'}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2">
                      {formData.category && (
                        <Badge className="capitalize">
                          {formData.category}
                        </Badge>
                      )}
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    
                    <div className="border-t pt-3 mt-3">
                      <p className="whitespace-pre-wrap">
                        {formData.content || 'Your discussion content will appear here.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/forums')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={!formData.title || !formData.content || !formData.category}
                >
                  Post Discussion
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default NewDiscussion;
