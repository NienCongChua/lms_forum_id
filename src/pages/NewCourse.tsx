
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from '@/components/ui/calendar';
import { ImagePlus, Plus, Trash2, Calendar as CalendarIcon, Clock, FileInput, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const NewCourse = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sample form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: '',
    isPublished: false,
    startDate: new Date(),
    duration: '8',
    capacity: '30',
    isOnline: true,
    materials: [{ title: '', file: null }]
  });
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your API
    console.log('Form submitted:', formData);
    
    toast({
      title: "Course created successfully",
      description: "Your new course has been created and is ready to be published."
    });
    
    // Navigate to courses page after successful creation
    setTimeout(() => {
      navigate('/courses');
    }, 1500);
  };
  
  const addMaterial = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, { title: '', file: null }]
    });
  };
  
  const removeMaterial = (index: number) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials.splice(index, 1);
    setFormData({
      ...formData,
      materials: updatedMaterials
    });
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Create New Course</h1>
            <p className="text-muted-foreground">Fill in the details to create a new course</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 backdrop-blur-sm bg-white/50 border border-white/20">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-6">
                  <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                    <CardHeader>
                      <CardTitle>Course Information</CardTitle>
                      <CardDescription>
                        Provide the basic details about your course
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Course Title</Label>
                        <Input 
                          id="title" 
                          name="title" 
                          placeholder="e.g., Introduction to Machine Learning" 
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Course Description</Label>
                        <Textarea 
                          id="description" 
                          name="description" 
                          placeholder="Provide a detailed description of your course" 
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
                          placeholder="e.g., 49.99" 
                          value={formData.price}
                          onChange={handleChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Leave empty for free courses
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="publish">Publish Course</Label>
                          <p className="text-xs text-muted-foreground">
                            Make this course available to students
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
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-6">
                  <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                    <CardHeader>
                      <CardTitle>Course Schedule</CardTitle>
                      <CardDescription>
                        Define when this course will start and how long it will run
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? (
                                selectedDate.toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration (weeks)</Label>
                          <Input 
                            id="duration" 
                            name="duration" 
                            type="number"
                            value={formData.duration}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="capacity">Max Capacity</Label>
                          <Input 
                            id="capacity" 
                            name="capacity" 
                            type="number"
                            value={formData.capacity}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="isOnline">Online Course</Label>
                          <p className="text-xs text-muted-foreground">
                            Is this course fully online?
                          </p>
                        </div>
                        <Switch 
                          id="isOnline" 
                          checked={formData.isOnline}
                          onCheckedChange={checked => handleSwitchChange('isOnline', checked)}
                        />
                      </div>
                      
                      {!formData.isOnline && (
                        <div className="p-4 border rounded-md bg-secondary/30">
                          <h3 className="font-medium mb-2">Physical Location Details</h3>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" placeholder="Building, Room number" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="materials" className="space-y-6">
                  <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                    <CardHeader>
                      <CardTitle>Course Materials</CardTitle>
                      <CardDescription>
                        Add study materials for your course
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {formData.materials.map((material, index) => (
                        <div key={index} className="p-4 border rounded-md space-y-3">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Material #{index + 1}</h3>
                            {formData.materials.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeMaterial(index)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`material-title-${index}`}>Title</Label>
                            <Input 
                              id={`material-title-${index}`} 
                              placeholder="e.g., Week 1 Lecture Notes" 
                              value={material.title}
                              onChange={(e) => {
                                const updatedMaterials = [...formData.materials];
                                updatedMaterials[index].title = e.target.value;
                                setFormData({
                                  ...formData,
                                  materials: updatedMaterials
                                });
                              }}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`material-file-${index}`}>File</Label>
                            <div className="border rounded-md p-4 flex items-center justify-center bg-secondary/30">
                              <Label
                                htmlFor={`material-file-${index}`}
                                className="cursor-pointer flex flex-col items-center"
                              >
                                <FileInput className="h-8 w-8 text-muted-foreground mb-2" />
                                <span className="text-sm font-medium">Click to upload file</span>
                                <span className="text-xs text-muted-foreground">
                                  PDF, DOC, PPT, or ZIP (max 50MB)
                                </span>
                              </Label>
                              <Input
                                id={`material-file-${index}`}
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addMaterial}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add More Materials
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>Course Thumbnail</CardTitle>
                    <CardDescription>
                      Upload an image to represent your course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden bg-secondary/30">
                      {thumbnailPreview ? (
                        <img 
                          src={thumbnailPreview} 
                          alt="Course thumbnail preview" 
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 flex flex-col items-center justify-center p-4">
                          <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium text-center">
                            Drop your image here or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground text-center mt-1">
                            Recommended size: 1280x720px
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <Label
                      htmlFor="thumbnail-upload"
                      className="mt-3 flex justify-center"
                    >
                      <Input
                        id="thumbnail-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                      />
                      <Button type="button" variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        {thumbnailPreview ? 'Change Image' : 'Upload Image'}
                      </Button>
                    </Label>
                  </CardContent>
                </Card>
                
                <Card className="backdrop-blur-sm bg-white/60 border-white/20">
                  <CardHeader>
                    <CardTitle>Course Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                        <p className="font-medium">
                          {formData.title || 'Your course title'}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                        <p>
                          {formData.category ? formData.category.charAt(0).toUpperCase() + formData.category.slice(1) : 'Not specified'}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Level</h3>
                        <p>
                          {formData.level.charAt(0).toUpperCase() + formData.level.slice(1)}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                        <p className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          {formData.duration} weeks
                        </p>
                      </div>
                      
                      {formData.price && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                          <p className="font-medium">
                            ${parseFloat(formData.price).toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="sticky top-24">
                  <div className="flex flex-col gap-2">
                    <Button type="submit" size="lg">
                      Create Course
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

export default NewCourse;
