import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import Theme from '../styles/Theme';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${Theme.spacing(12)} ${Theme.spacing(3)};
  background-color: ${Theme.colors.background.default};
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${Theme.spacing(3)};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Theme.spacing(1)};
`;

const Label = styled.label`
  color: ${Theme.colors.text.primary};
  font-weight: ${Theme.typography.fontWeight.medium};
`;

const Input = styled.input`
  padding: ${Theme.spacing(1.5)};
  border: 1px solid ${Theme.colors.neutral[400]};
  border-radius: ${Theme.borderRadius.small};
  background-color: ${Theme.colors.background.paper};
  color: ${Theme.colors.text.primary};
  
  &:focus {
    outline: none;
    border-color: ${Theme.colors.primary[500]};
  }
`;

const Select = styled.select`
  padding: ${Theme.spacing(1.5)};
  border: 1px solid ${Theme.colors.neutral[400]};
  border-radius: ${Theme.borderRadius.small};
  background-color: ${Theme.colors.background.paper};
  color: ${Theme.colors.text.primary};
  
  &:focus {
    outline: none;
    border-color: ${Theme.colors.primary[500]};
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Theme.spacing(1)};
  padding: ${Theme.spacing(1)};
  border: 1px solid ${Theme.colors.neutral[400]};
  border-radius: ${Theme.borderRadius.small};
  background-color: ${Theme.colors.background.paper};
`;

const Tag = styled.span`
  background-color: ${Theme.colors.primary[500]};
  color: white;
  padding: ${Theme.spacing(0.5)} ${Theme.spacing(1)};
  border-radius: ${Theme.borderRadius.small};
  display: flex;
  align-items: center;
  gap: ${Theme.spacing(1)};
`;

const TagDelete = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
  
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
`;

const DropzoneContainer = styled.div`
  border: 2px dashed ${Theme.colors.neutral[400]};
  border-radius: ${Theme.borderRadius.medium};
  padding: ${Theme.spacing(4)};
  text-align: center;
  cursor: pointer;
  
  &:hover {
    border-color: ${Theme.colors.primary[500]};
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: ${Theme.spacing(2)};
  border-radius: ${Theme.borderRadius.small};
`;

const EditorContainer = styled.div`
  .quill {
    background-color: ${Theme.colors.background.paper};
    
    .ql-toolbar {
      border-color: ${Theme.colors.neutral[400]};
      border-top-left-radius: ${Theme.borderRadius.small};
      border-top-right-radius: ${Theme.borderRadius.small};
    }
    
    .ql-container {
      border-color: ${Theme.colors.neutral[400]};
      border-bottom-left-radius: ${Theme.borderRadius.small};
      border-bottom-right-radius: ${Theme.borderRadius.small};
      min-height: 200px;
    }
    
    .ql-editor {
      color: ${Theme.colors.text.primary};
    }
  }
`;

const Button = styled.button`
  background-color: ${Theme.colors.primary[500]};
  color: white;
  padding: ${Theme.spacing(2)} ${Theme.spacing(4)};
  border: none;
  border-radius: ${Theme.borderRadius.medium};
  font-weight: ${Theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${Theme.transitions.short};
  
  &:hover {
    background-color: ${Theme.colors.primary[600]};
  }
  
  &:disabled {
    background-color: ${Theme.colors.neutral[400]};
    cursor: not-allowed;
  }
`;

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
  
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });
  
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()]
        }));
      }
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    const newBlog = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      author: {
        name: 'Your Name',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      readTime: Math.ceil(formData.content.split(' ').length / 200),
      slug: formData.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    };
    
    // For now, we'll just log it
    console.log('New Blog:', newBlog);
    
    // Navigate back to the blog list
    navigate('/blog');
  };
  
  return (
    <PageContainer>
      <Container>
        <Title>Create New Blog Post</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter blog title"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Category</Label>
            <Select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="React">React</option>
              <option value="UX">UX</option>
              <option value="Backend">Backend</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Tags</Label>
            <TagInput>
              {formData.tags.map(tag => (
                <Tag key={tag}>
                  {tag}
                  <TagDelete onClick={() => removeTag(tag)}>&times;</TagDelete>
                </Tag>
              ))}
              <TagInputField
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags (press Enter)"
              />
            </TagInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Cover Image</Label>
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag & drop an image here, or click to select one</p>
              {formData.coverImage && (
                <ImagePreview src={formData.coverImage} alt="Preview" />
              )}
            </DropzoneContainer>
          </FormGroup>
          
          <FormGroup>
            <Label>Content</Label>
            <EditorContainer>
              <ReactQuill
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                theme="snow"
              />
            </EditorContainer>
          </FormGroup>
          
          <Button type="submit">
            Publish Blog Post
          </Button>
        </Form>
      </Container>
    </PageContainer>
  );
};

export default AddBlog;