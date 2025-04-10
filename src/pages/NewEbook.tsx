
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, FileText, ImagePlus, Plus, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const NewEbook = () => {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sample form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    level: 'beginner',
    price: '',
    isPublished: false,
    tags: [''],
    chapters: [{ title: '', description: '' }]
  });
  
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFile(file);
      
      toast({
        title: "PDF uploaded",
        description: `File "${file.name}" has been uploaded.`
      });
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleTagChange = (index: number, value: string) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData({
      ...formData,
      tags: updatedTags
    });
  };
  
  const addTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, '']
    });
  };
  
  const removeTag = (index: number) => {
    const updatedTags = [...formData.tags];
    updatedTags.splice(index, 1);
    setFormData({
      ...formData,
      tags: updatedTags
    });
  };
  
  const handleChapterChange = (index: number, field: string, value: string) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      [field]: value
    };
    setFormData({
      ...formData,
      chapters: updatedChapters
    });
  };
  
  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [...formData.chapters, { title: '', description: '' }]
    });
  };
  
  const removeChapter = (index: number) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters.splice(index, 1);
    setFormData({
      ...formData,
      chapters: updatedChapters
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your API
    console.log('Form submitted:', formData);
    console.log('PDF file:', pdfFile);
    
    toast({
      title: "E-book created successfully",
      description: "Your new e-book has been created and is ready to be published."
    });
    
    // Navigate to resources page after successful creation
    setTimeout(() => {
      navigate('/resources');
    }, 1500);
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Create New E-Book</h1>
            <p className="text-muted-foreground">Fill in the details to publish a new e-book</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Provide the basic details about your e-book
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">E-Book Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        placeholder="e.g., Advanced JavaScript Techniques" 
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input 
                        id="author" 
                        name="author" 
                        placeholder="e.g., John Doe" 
                        value={formData.author}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        placeholder="Provide a detailed description of your e-book" 
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
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
                            <SelectItem value="programming">Programming</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="level">Difficulty Level</Label>
                        <Select 
                          value={formData.level} 
                          onValueChange={value => handleSelectChange('level', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (USD)</Label>
                      <Input 
                        id="price" 
                        name="price" 
                        type="number"
                        placeholder="e.g., 9.99" 
                        value={formData.price}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave empty for free e-books
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="publish">Publish E-Book</Label>
                        <p className="text-xs text-muted-foreground">
                          Make this e-book available to users
                        </p>
                      </div>
                      <Switch 
                        id="publish" 
                        checked={formData.isPublished}
                        onCheckedChange={checked => handleSwitchChange('isPublished', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                    <CardDescription>
                      Add tags to help users find your e-book
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.tags
                        .filter(tag => tag.trim() !== '')
                        .map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                            {tag}
                          </Badge>
                        ))
                      }
                    </div>
                    
                    {formData.tags.map((tag, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input 
                          placeholder="e.g., JavaScript, Programming, Web Development" 
                          value={tag}
                          onChange={(e) => handleTagChange(index, e.target.value)}
                        />
                        {formData.tags.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTag(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTag}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tag
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>Table of Contents</CardTitle>
                    <CardDescription>
                      Outline the chapters of your e-book
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.chapters.map((chapter, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Chapter {index + 1}</h3>
                          {formData.chapters.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeChapter(index)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`chapter-title-${index}`}>Title</Label>
                          <Input 
                            id={`chapter-title-${index}`} 
                            placeholder="e.g., Introduction to JavaScript"
                            value={chapter.title}
                            onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`chapter-desc-${index}`}>Description</Label>
                          <Textarea 
                            id={`chapter-desc-${index}`} 
                            placeholder="Brief description of this chapter"
                            rows={2}
                            value={chapter.description}
                            onChange={(e) => handleChapterChange(index, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addChapter}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Chapter
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>E-Book Cover</CardTitle>
                    <CardDescription>
                      Upload a cover image for your e-book
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden bg-secondary/30">
                      {coverPreview ? (
                        <img 
                          src={coverPreview} 
                          alt="E-book cover preview" 
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 flex flex-col items-center justify-center p-4">
                          <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium text-center">
                            Drop your cover image here or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground text-center mt-1">
                            Recommended size: 1200x1800px
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <Label
                      htmlFor="cover-upload"
                      className="mt-3 flex justify-center"
                    >
                      <Input
                        id="cover-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleCoverChange}
                      />
                      <Button type="button" variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        {coverPreview ? 'Change Cover' : 'Upload Cover'}
                      </Button>
                    </Label>
                  </CardContent>
                </Card>
                
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>Upload PDF</CardTitle>
                    <CardDescription>
                      Upload your e-book in PDF format
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md p-6 flex flex-col items-center justify-center bg-secondary/30">
                      {pdfFile ? (
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Check className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium">{pdfFile.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                          <Label
                            htmlFor="pdf-upload"
                            className="mt-4 inline-block"
                          >
                            <Button type="button" variant="outline" size="sm">
                              Replace File
                            </Button>
                          </Label>
                        </div>
                      ) : (
                        <Label
                          htmlFor="pdf-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                          <span className="text-sm font-medium">Click to upload PDF file</span>
                          <span className="text-xs text-muted-foreground mt-1">
                            Max file size: 50MB
                          </span>
                        </Label>
                      )}
                      <Input
                        id="pdf-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handlePdfChange}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="sticky top-24">
                  <div className="flex flex-col gap-2">
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={!pdfFile || !formData.title || !formData.author}
                    >
                      Create E-Book
                    </Button>
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AnimatedTransition>
  );
};

export default NewEbook;
