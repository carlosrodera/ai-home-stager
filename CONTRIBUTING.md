# Contributing to AI Home Stager

Thank you for your interest in contributing to AI Home Stager! This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Git
- Google Gemini API Key

### Local Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/ai-home-stager.git`
3. Install dependencies: `npm install`
4. Copy environment template: `cp .env.local.example .env.local`
5. Add your Gemini API key to `.env.local`
6. Start development server: `npm run dev`

## 📝 How to Contribute

### Reporting Bugs
- Use the GitHub Issues template
- Provide clear reproduction steps
- Include screenshots if applicable
- Specify your environment (browser, OS, Node.js version)

### Suggesting Features
- Check existing issues first
- Provide a clear use case
- Explain the expected behavior
- Consider implementation complexity

### Code Contributions
1. **Fork & Branch**: Create a feature branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Develop**: Make your changes following our coding standards
   
3. **Test**: Ensure your changes don't break existing functionality
   
4. **Commit**: Use conventional commit messages
   ```bash
   git commit -m "feat: add new staging style option"
   ```

5. **Push & PR**: Push your branch and create a Pull Request

## 🎨 Coding Standards

### TypeScript/React Guidelines
- Use TypeScript for all new code
- Follow React functional component patterns
- Implement proper error handling
- Add JSDoc comments for public functions
- Use meaningful variable and function names

### Code Style
- Use Prettier for formatting (configuration provided)
- Follow ESLint rules
- Maintain consistent indentation (2 spaces)
- Add trailing commas in objects/arrays
- Use single quotes for strings

### Component Structure
```typescript
// Good example
interface ComponentProps {
  title: string;
  onAction: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // Implementation
};

export default Component;
```

## 🧪 Testing

### Before Submitting
- Test all staging styles work correctly
- Verify file upload functionality
- Check responsive design on different screen sizes
- Test error scenarios (invalid API key, network issues)
- Ensure no console errors

### Manual Testing Checklist
- [ ] Upload different image formats (JPG, PNG, WebP)
- [ ] Apply different staging styles
- [ ] Download generated images
- [ ] Test on mobile devices
- [ ] Verify loading states work correctly

## 📁 Project Structure

### Key Directories
```
src/
├── components/     # Reusable UI components
├── services/       # API calls and business logic
├── types/          # TypeScript type definitions
├── utils/          # Helper functions
└── assets/         # Static resources
```

### Adding New Features

#### New Staging Style
1. Add style definition to `STAGING_STYLES` array in `App.tsx`
2. Include detailed prompt engineering for consistent results
3. Add documentation to README.md
4. Test with various room types

#### New Component
1. Create in `components/` directory
2. Follow existing naming conventions
3. Export default and add to appropriate parent
4. Include TypeScript interfaces

## 🚀 Deployment

### Production Considerations
- Environment variables security
- Bundle size optimization
- Performance monitoring
- Error tracking
- API rate limiting

## 📚 Resources

### Gemini AI Documentation
- [Gemini API Documentation](https://ai.google.dev/)
- [Image Generation Best Practices](https://ai.google.dev/docs/gemini_api_cookbook)

### React/TypeScript Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers learn
- Focus on the problem, not the person

### Communication
- Use clear, descriptive titles for issues/PRs
- Provide context and examples
- Be patient with review process
- Ask questions when unclear

## 📋 Pull Request Checklist

Before submitting your PR, ensure:
- [ ] Code follows project standards
- [ ] All tests pass
- [ ] Documentation updated (if needed)
- [ ] No console errors/warnings
- [ ] Responsive design maintained
- [ ] Performance impact considered
- [ ] Security implications reviewed

## 🎯 Priority Areas

We're especially interested in contributions for:
- **New staging styles** (Industrial, Bohemian, Classic)
- **Performance optimizations**
- **Mobile experience improvements**
- **Accessibility features**
- **Error handling enhancements**
- **Unit/integration tests**

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: For security concerns or private matters

## 🙏 Recognition

Contributors will be:
- Added to our Contributors section
- Mentioned in release notes
- Invited to our contributor community

Thank you for helping make AI Home Stager better! 🚀