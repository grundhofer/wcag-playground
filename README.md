# TechFlow Digital - WCAG 2.2 Accessibility Testing Site

A realistic business website simulation designed for accessibility training. This site appears to be a normal digital agency website but contains carefully embedded WCAG 2.2 Level A and AA violations for educational purposes.

## 🎯 Purpose

Unlike obvious testing tools, this website simulates real-world accessibility issues that developers encounter. Participants must use actual testing methods to discover violations - just like auditing real client websites.

## 🏢 The Business

**TechFlow Digital** is a fictional digital agency offering web development, mobile apps, and consulting services. The website includes:

- Professional homepage with services and testimonials
- Detailed services page with pricing and processes  
- Contact page with complex forms
- Realistic business functionality and content

## 🔍 What Makes This Different

**Realistic Context**: Issues are embedded in natural business scenarios, not obvious educational examples.

**Mixed Implementation**: Contains both correct and incorrect accessibility implementations, just like real websites.

**Subtle Issues**: Requires actual testing to discover - keyboard navigation, screen readers, contrast tools, etc.

**Professional Appearance**: Looks like a legitimate business website that happens to have accessibility problems.

## 🚀 GitHub Pages Setup

### Quick Deployment

1. Fork this repository
2. Go to Settings → Pages in your forked repo
3. Set source to "Deploy from a branch"
4. Select `main` branch and `/` (root) folder
5. Save - your site will be available at `https://yourusername.github.io/wcag-testing-playground`

### Local Development

```bash
git clone https://github.com/yourusername/wcag-testing-playground.git
cd wcag-testing-playground
# Serve with any static server
python -m http.server 8000
```

## 📄 Site Structure

- **`index.html`** - Agency homepage with hero, services, testimonials
- **`services.html`** - Service offerings with forms and interactions
- **`contact.html`** - Contact forms with various accessibility issues
- **`instructor-guide.html`** - Detailed reference for instructors (hidden from normal navigation)

## 🎓 For Training Sessions

### Participant Instructions

1. **Treat it like a real client website** - no obvious "find the issues" prompts
2. **Use standard testing methods**:
   - Keyboard-only navigation (Tab, Enter, Arrows, Escape)
   - Screen reader testing (NVDA, JAWS, VoiceOver, ORCA)
   - Color contrast analysis
   - Zoom testing (200%)
   - Automated scanning (axe, WAVE)
3. **Document findings by WCAG criterion**
4. **Test all interactive elements** - forms, modals, dropdowns, sliders

### Instructor Resources

- **Complete issue reference**: `instructor-guide.html` (comprehensive list with page locations)
- **Mixed examples**: Point out both broken and correct implementations
- **Realistic scenarios**: Issues mirror common developer mistakes
- **Progressive difficulty**: Start with obvious issues, progress to subtle ones

## 🔧 Sample Issues Embedded

The website contains realistic accessibility barriers including:

- Poor color contrast in business contexts
- Missing alt text mixed with proper descriptions
- Form validation without screen reader support
- Auto-advancing content without pause controls
- Custom components missing ARIA attributes
- Focus management issues in modals
- Color-only information coding
- Keyboard accessibility gaps
- Time limits without user control
- Status updates not announced

## 📋 Testing Checklist

- [ ] Navigate entire site using only keyboard
- [ ] Test with screen reader software  
- [ ] Check color contrast ratios
- [ ] Verify form accessibility and error handling
- [ ] Test custom interactive components
- [ ] Look for timing issues and auto-updating content
- [ ] Validate HTML structure and ARIA implementation
- [ ] Test zoom and reflow at 200%
- [ ] Check focus management and visibility

## 🛠️ Technical Details

**Built with**: Vanilla HTML, CSS, JavaScript (no frameworks)
**Images**: SVG placeholders that display properly
**Functionality**: Realistic business features (forms, modals, sliders)
**Responsive**: Mobile-friendly design
**Browser Support**: Modern browsers with accessibility APIs

## 📚 Educational Value

This simulation teaches participants to:

1. **Test like professionals** using real accessibility tools and methods
2. **Identify subtle issues** that automated tools might miss
3. **Understand user impact** through hands-on screen reader experience  
4. **Recognize common mistakes** developers make in real projects
5. **Appreciate mixed implementations** where some things work and others don't

## 🤝 Contributing

To improve the training content:

1. Fork and create feature branch
2. Ensure new issues are realistic and educational
3. Test with actual assistive technology
4. Update instructor guide with new issue locations
5. Submit pull request with clear descriptions

## ⚠️ Important Notes

- **This site intentionally contains accessibility barriers** for educational purposes
- **Not for production use** - contains deliberate violations
- **Requires instructor guidance** for effective learning
- **Test with real assistive technology** for authentic experience
- **Images are placeholder SVGs** - replace with actual content for real use

## 📖 WCAG 2.2 Coverage

This simulation covers major Level A and AA success criteria including:
- Non-text Content (1.1.1)
- Keyboard Access (2.1.1) 
- Focus Management (2.4.3, 2.4.7)
- Form Labels (3.3.2)
- Color Contrast (1.4.3)
- Time Limits (2.2.1)
- Status Messages (4.1.3)
- And many more embedded in realistic contexts

---

**Perfect for**: Accessibility training workshops, developer education, QA team training, and certification prep.

**Remember**: The goal is learning through realistic testing, not obvious issue-spotting. Use the same tools and methods you'd use on real client websites.