import { useEffect, useRef } from 'react';

export default function SkillsScroller({ skills, label }) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper || !skills?.length) {
      return undefined;
    }

    let isScrolling = false;
    let startY = 0;
    let scrollTop = 0;

    const handleMouseDown = (event) => {
      isScrolling = true;
      container.style.cursor = 'grabbing';
      startY = event.pageY - container.offsetTop;
      scrollTop = container.scrollTop;
      event.preventDefault();
    };

    const handleMouseUp = () => {
      isScrolling = false;
      container.style.cursor = 'grab';
    };

    const handleMouseMove = (event) => {
      if (!isScrolling) return;
      const y = event.pageY - container.offsetTop;
      const walkY = (y - startY) * 1.5;
      container.scrollTop = scrollTop - walkY;
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    const skillItems = container.querySelectorAll('.skill-icon-container');
    const itemCount = skillItems.length;
    if (itemCount > 6) {
      wrapper.style.animationDuration = `${Math.min(30, itemCount * 2.5)}s`;
    }

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [skills]);

  if (!skills?.length) {
    return null;
  }

  return (
    <div ref={containerRef} className="skills-container py-3" aria-label={label || ''}>
      <div ref={wrapperRef} className="skills-scroll-wrapper">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-icon-container">
              <div className="skill-icon-wrapper">
                <div className="skill-icon">
                  <i className={`bx ${skill.icon} text-4xl`} aria-hidden="true"></i>
                </div>
                <div className="skill-name mt-3 text-center">
                  <span className="font-medium">{skill.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
