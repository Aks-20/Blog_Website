import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import Theme from '../styles/Theme';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${Theme.spacing(12)} ${Theme.spacing(3)};
  background-color: ${Theme.colors.background.default};
  font-family: ${Theme.typography.fontFamily};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: ${Theme.colors.background.paper};
  padding: ${Theme.spacing(4)};
  border-radius: ${Theme.borderRadius.medium};
  box-shadow: ${Theme.shadows.medium};
`;

const Title = styled.h1`
  color: ${Theme.colors.text.primary};
  margin-bottom: ${Theme.spacing(4)};
  font-size: 2.5rem;
  font-weight: ${Theme.typography.fontWeight.bold};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${Theme.spacing(4)};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Theme.spacing(1.5)};
`;

const Label = styled.label`
  color: ${Theme.colors.text.primary};
  font-weight: ${Theme.typography.fontWeight.medium};
  font-size: 1.1rem;
`;

const Input = styled.input`
  padding: ${Theme.spacing(2)};
  border: 1px solid ${Theme.colors.neutral[400]};
  border-radius: ${Theme.borderRadius.small};
  background-color: ${Theme.colors.background.paper};
  color: ${Theme.colors.text.primary};
  font-size: 1rem;
  transition: border-color ${Theme.transitions.short};
  
  &:focus {
    outline: none;
    border-color: ${Theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${Theme.colors.primary[100]};
  }
  
  &::placeholder {
    color: ${Theme.colors.text.secondary};
  }
`;

const Select = styled.select`
  padding: ${Theme.spacing(2)};
  border: 1px solid ${Theme.colors.neutral[400]};
  border-radius: ${Theme.borderRadius.small};
  background-color: ${Theme.colors.background.paper};
  color: ${Theme.colors.text.primary};
  font-size: 1rem;
  cursor: pointer;
  transition: border-color ${Theme.transitions.short};
  
  &:focus {
    outline: none;
    border-color: ${Theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${Theme.colors.primary[100]};
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Theme.spacing(1)};
  padding: ${Theme.spacing(1.5)};
  border: 1px solid ${Theme.colors.neutral[400]};
  border-radius: ${Theme.borderRadius.small};
  background-color: ${Theme.colors.background.paper};
  transition: border-color ${Theme.transitions.short};
  
  &:focus-within {
    border-color: ${Theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${Theme.colors.primary[100]};
  }
`;

const Tag = styled.span`
  background-color: ${Theme.colors.primary[500]};
  color: white;
  padding: ${Theme.spacing(0.75)} ${Theme.spacing(1.5)};
  border-radius: ${Theme.borderRadius.pill};
  display: flex;
  align-items: center;
  gap: ${Theme.spacing(1)};
  font-size: 0.9rem;
  transition: background-color ${Theme.transitions.short};
  
  &:hover {
    background-color: ${Theme.colors.primary[600]};
  }
`;

const TagDelete = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

const TagInputField = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 100px;
  background-color: transparent;
  color: ${Theme.colors.text.primary};
  font-size: 1rem;
  padding: ${Theme.spacing(0.5)};
  
  &::placeholder {
    color: ${Theme.colors.text.secondary};
  }
`;

const DropzoneContainer = styled.div`
  border: 2px dashed ${Theme.colors.neutral[400]};
  border-radius: ${Theme.borderRadius.medium};
  padding: ${Theme.spacing(4)};
  text-align: center;
  cursor: pointer;
  transition: all ${Theme.transitions.medium};
  
  &:hover {
    border-color: ${Theme.colors.primary[500]};
    background-color: ${Theme.colors.primary[50]};
  }
  
  &.active {
    border-color: ${Theme.colors.primary[500]};
    background-color: ${Theme.colors.primary[100]};
  }
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  margin-top: ${Theme.spacing(2)};
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: ${Theme.borderRadius.small};
  display: block;
  margin: 0 auto;
  box-shadow: ${Theme.shadows.small};
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: ${Theme.spacing(1)};
  right: ${Theme.spacing(1)};
  background-color: ${Theme.colors.error.main};
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color ${Theme.transitions.short};
  
  &:hover {
    background-color: ${Theme.colors.error.dark};
  }
`;

const EditorContainer = styled.div`
  .quill {
    background-color: ${Theme.colors.background.paper};
    border-radius: ${Theme.borderRadius.small};
    transition: all ${Theme.transitions.short};
    
    .ql-toolbar {
      border-color: ${Theme.colors.neutral[400]};
      border-top-left-radius: ${Theme.borderRadius.small};
      border-top-right-radius: ${Theme.borderRadius.small};
      background-color: ${Theme.colors.background.paper};
    }
    
    .ql-container {
      border-color: ${Theme.colors.neutral[400]};
      border-bottom-left-radius: ${Theme.borderRadius.small};
      border-bottom-right-radius: ${Theme.borderRadius.small};
      min-height: 300px;
      font-size: 1.1rem;
      line-height: 1.6;
    }
    
    .ql-editor {
      color: ${Theme.colors.text.primary};
      padding: ${Theme.spacing(3)};
      
      &.ql-blank::before {
        color: ${Theme.colors.text.secondary};
        font-style: normal;
        left: ${Theme.spacing(3)};
      }
      
      h1, h2, h3 {
        margin: ${Theme.spacing(3)} 0 ${Theme.spacing(1.5)};
      }
      
      p {
        margin-bottom: ${Theme.spacing(2)};
      }
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${Theme.spacing(2)};
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: ${Theme.spacing(2)} ${Theme.spacing(4)};
  border: none;
  border-radius: ${Theme.borderRadius.medium};
  font-weight: ${Theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${Theme.transitions.short};
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: ${Theme.spacing(1)};
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${Theme.colors.primary[500]};
  color: white;
  
  &:hover:not(:disabled) {
    background-color: ${Theme.colors.primary[600]};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${Theme.colors.text.primary};
  border: 1px solid ${Theme.colors.neutral[400]};
  
  &:hover:not(:disabled) {
    background-color: ${Theme.colors.neutral[100]};
  }
`;

const CharacterCount = styled.div`
  color: ${Theme.colors.text.secondary};
  font-size: 0.9rem;
  text-align: right;
  margin-top: ${Theme.spacing(1)};
`;

const ErrorMessage = styled.div`
  color: ${Theme.colors.error.main};
  font-size: 0.9rem;
  margin-top: ${Theme.spacing(0.5)};
`;

const SuccessMessage = styled.div`
  color: ${Theme.colors.success.main};
  font-size: 0.9rem;
  margin-top: ${Theme.spacing(0.5)};
`;

// Quill modules configuration
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: [],
    content: '',
    coverImage: null
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const editorRef = useRef(null);
  
  // Calculate read time (200 words per minute)
  const readTime = Math.ceil(wordCount / 200);
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };
  
  // Handle content changes
  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
    setIsDirty(true);
    
    // Calculate word and character counts
    const text = content.replace(/<[^>]*>/g, ' ').trim();
    const words = text ? text.split(/\s+/).filter(word => word.length > 0) : [];
    setWordCount(words.length);
    setCharacterCount(text.length);
  };
  
  // Handle image drop
  const onDrop = (acceptedFiles) => {
    setError('');
    const file = acceptedFiles[0];
    
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, coverImage: reader.result }));
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024 // 5MB
  });
  
  // Handle tag input
  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && currentTag.trim()) {
      e.preventDefault();
      const tag = currentTag.trim().replace(/,/g, '');
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag].slice(0, 10) // Limit to 10 tags
        }));
        setIsDirty(true);
      }
      setCurrentTag('');
    } else if (e.key === 'Backspace' && !currentTag && formData.tags.length > 0) {
      // Remove last tag when backspace is pressed with empty input
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.slice(0, -1)
      }));
      setIsDirty(true);
    }
  };
  
  // Remove a tag
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
    setIsDirty(true);
  };
  
  // Remove cover image
  const removeCoverImage = () => {
    setFormData(prev => ({ ...prev, coverImage: null }));
    setIsDirty(true);
  };
  
  // Focus editor on load
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.focus();
    }
  }, []);
   useEffect(() => {
      fetch("http://localhost:8000/api/v1/blogs")
        .then(res => res.json())
        .then(data => setBlogs(data))
        .catch(err => console.error("Error fetching blogs:", err));
    }, []);
  
  // Auto-save draft
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        localStorage.setItem('blogDraft', JSON.stringify(formData));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [formData, isDirty]);
  
  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('blogDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft);
        const text = draft.content.replace(/<[^>]*>/g, ' ').trim();
        const words = text ? text.split(/\s+/).filter(word => word.length > 0) : [];
        setWordCount(words.length);
        setCharacterCount(text.length);
      } catch (e) {
        console.error('Failed to parse saved draft', e);
      }
    }
  }, []);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate form
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.category) {
      setError('Category is required');
      return;
    }
    
    if (formData.content.replace(/<[^>]*>/g, '').trim().length > 100) {
      setError('Content should be at least 100 characters');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newBlog = {
        ...formData,
        id: uuidv4(),
        date: new Date().toISOString(),
        author: {
          name: 'Your Name',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        },
        readTime,
        slug: formData.title.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-'),
        wordCount,
        characterCount
      };
      
      console.log('New Blog:', newBlog);
      
      // Clear draft
      localStorage.removeItem('blogDraft');
      
      setSuccess('Blog post published successfully!');
      setIsDirty(false);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/blog');
      }, 2000);
    } catch (err) {
      setError('Failed to publish blog post. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle save as draft
  const handleSaveDraft = () => {
    localStorage.setItem('blogDraft', JSON.stringify(formData));
    setSuccess('Draft saved successfully!');
    setIsDirty(false);
    setTimeout(() => setSuccess(''), 3000);
  };
  
  // Handle cancel
  const handleCancel = () => {
    if (isDirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (confirm) {
        navigate('/blog');
      }
    } else {
      navigate('/blog');
    }
  };
  
  return (
    <PageContainer>
      <Container>
        <Title>Create New Blog Post</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title *</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
              maxLength={120}
            />
            <CharacterCount>{formData.title.length}/120 characters</CharacterCount>
          </FormGroup>
          
          <FormGroup>
            <Label>Category *</Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="React">React</option>
              <option value="UX">User Experience</option>
              <option value="Backend">Backend Development</option>
              <option value="Frontend">Frontend Development</option>
              <option value="Mobile">Mobile Development</option>
              <option value="DevOps">DevOps</option>
              <option value="Career">Career Advice</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Tags (Max 10)</Label>
            <TagInput>
              {formData.tags.map(tag => (
                <Tag key={tag}>
                  {tag}
                  <TagDelete onClick={() => removeTag(tag)} aria-label={`Remove tag ${tag}`}>
                    &times;
                  </TagDelete>
                </Tag>
              ))}
              {formData.tags.length < 10 && (
                <TagInputField
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={formData.tags.length === 0 ? "Add tags (press Enter or comma)" : ""}
                />
              )}
            </TagInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Cover Image</Label>
            {!formData.coverImage ? (
              <DropzoneContainer {...getRootProps()} className={isDragActive ? 'active' : ''}>
                <input {...getInputProps()} />
                <p>{isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select one'}</p>
                <p>Recommended size: 1200x630px (Max 5MB)</p>
              </DropzoneContainer>
            ) : (
              <ImagePreviewContainer>
                <ImagePreview src={formData.coverImage} alt="Preview" />
                <RemoveImageButton onClick={removeCoverImage} aria-label="Remove cover image">
                  &times;
                </RemoveImageButton>
              </ImagePreviewContainer>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Content *</Label>
            <EditorContainer>
              <ReactQuill
                ref={editorRef}
                value={formData.content}
                onChange={handleContentChange}
                theme="snow"
                modules={modules}
                formats={formats}
                placeholder="Tell your story..."
              />
            </EditorContainer>
            <CharacterCount>
              {wordCount} words ({readTime} min read) • {characterCount} characters
            </CharacterCount>
          </FormGroup>
          
          <ButtonGroup>
            <SecondaryButton type="button" onClick={handleCancel}>
              Cancel
            </SecondaryButton>
            <SecondaryButton type="button" onClick={handleSaveDraft} disabled={!isDirty}>
              Save Draft
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </PrimaryButton>
          </ButtonGroup>
        </Form>
      </Container>
    </PageContainer>
  );
};

export default AddBlog;