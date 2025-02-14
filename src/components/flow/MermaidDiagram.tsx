import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  title?: string;
}

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#f43f5e',
    primaryTextColor: '#fafafa',
    primaryBorderColor: '#f43f5e',
    lineColor: '#71717a',
    secondaryColor: '#27272a',
    tertiaryColor: '#18181b'
  },
  flowchart: {
    curve: 'basis',
    padding: 20
  }
});

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.render('mermaid-diagram', chart).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      });
    }
  }, [chart]);

  return (
    <div className="bg-surface-100 rounded-2xl p-8 border border-surface-200">
      {title && (
        <h3 className="text-xl font-bold text-surface-900 mb-6">{title}</h3>
      )}
      <div 
        ref={containerRef} 
        className="overflow-x-auto"
      />
    </div>
  );
}