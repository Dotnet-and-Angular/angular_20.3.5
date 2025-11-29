// SVG Icons Constants used across the entire application
export interface SVGIcon {
    viewBox: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    paths: Array<{
        tag: string;
        attrs: Record<string, string>;
    }>;
}

export const SVG_ICONS: Record<string, SVGIcon> = {
    // Search Icon
    SEARCH: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'circle', attrs: { cx: '11', cy: '11', r: '8' } },
            { tag: 'path', attrs: { d: 'm21 21-4.35-4.35' } }
        ]
    },

    // Plus/Add Icon
    PLUS: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'line', attrs: { x1: '12', y1: '5', x2: '12', y2: '19' } },
            { tag: 'line', attrs: { x1: '5', y1: '12', x2: '19', y2: '12' } }
        ]
    },

    // Close/X Icon
    CLOSE: {
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        paths: [
            { tag: 'path', attrs: { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' } }
        ]
    },

    // Error/Warning Icon
    ERROR: {
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        paths: [
            { tag: 'path', attrs: { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' } }
        ]
    },

    // Edit/Pencil Icon
    EDIT: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'path', attrs: { d: 'M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z' } }
        ]
    },

    // Delete/Trash Icon
    DELETE: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'polyline', attrs: { points: '3 6 5 6 21 6' } },
            { tag: 'path', attrs: { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' } },
            { tag: 'line', attrs: { x1: '10', y1: '11', x2: '10', y2: '17' } },
            { tag: 'line', attrs: { x1: '14', y1: '11', x2: '14', y2: '17' } }
        ]
    },

    // Empty State/File Icon
    EMPTY_STATE: {
        viewBox: '0 0 120 120',
        fill: 'none',
        paths: [
            { tag: 'circle', attrs: { cx: '60', cy: '60', r: '50', stroke: 'currentColor', 'stroke-width': '2', opacity: '0.1' } },
            { tag: 'path', attrs: { d: 'M60 40C48 40 40 48 40 60C40 72 48 80 60 80C72 80 80 72 80 60C80 48 72 40 60 40Z', stroke: 'currentColor', 'stroke-width': '2', fill: 'none' } }
        ]
    },

    // Menu/Hamburger Icon
    MENU: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'line', attrs: { x1: '3', y1: '6', x2: '21', y2: '6' } },
            { tag: 'line', attrs: { x1: '3', y1: '12', x2: '21', y2: '12' } },
            { tag: 'line', attrs: { x1: '3', y1: '18', x2: '21', y2: '18' } }
        ]
    },

    // Check/Checkmark Icon
    CHECK: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'polyline', attrs: { points: '20 6 9 17 4 12' } }
        ]
    },

    // Arrow Right Icon
    ARROW_RIGHT: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'line', attrs: { x1: '5', y1: '12', x2: '19', y2: '12' } },
            { tag: 'polyline', attrs: { points: '12 5 19 12 12 19' } }
        ]
    },

    // Arrow Left Icon
    ARROW_LEFT: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'line', attrs: { x1: '19', y1: '12', x2: '5', y2: '12' } },
            { tag: 'polyline', attrs: { points: '12 19 5 12 12 5' } }
        ]
    },

    // Home Icon
    HOME: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'path', attrs: { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' } },
            { tag: 'polyline', attrs: { points: '9 22 9 12 15 12 15 22' } }
        ]
    },

    // Settings Icon
    SETTINGS: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'circle', attrs: { cx: '12', cy: '12', r: '3' } },
            { tag: 'path', attrs: { d: 'M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24' } }
        ]
    },

    // User/Profile Icon
    USER: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'path', attrs: { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' } },
            { tag: 'circle', attrs: { cx: '12', cy: '7', r: '4' } }
        ]
    },

    // Bell/Notification Icon
    BELL: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'path', attrs: { d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' } },
            { tag: 'path', attrs: { d: 'M13.73 21a2 2 0 0 1-3.46 0' } }
        ]
    },

    // Lock Icon
    LOCK: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'rect', attrs: { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' } },
            { tag: 'path', attrs: { d: 'M7 11V7a5 5 0 0 1 10 0v4' } }
        ]
    },

    // Eye Icon
    EYE: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'path', attrs: { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' } },
            { tag: 'circle', attrs: { cx: '12', cy: '12', r: '3' } }
        ]
    },

    // Download Icon
    DOWNLOAD: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        paths: [
            { tag: 'path', attrs: { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' } },
            { tag: 'polyline', attrs: { points: '7 10 12 15 17 10' } },
            { tag: 'line', attrs: { x1: '12', y1: '15', x2: '12', y2: '3' } }
        ]
    }
};

// Helper function to get SVG icon attributes
export function getSVGAttributes(iconName: keyof typeof SVG_ICONS): Record<string, string> {
    const icon = SVG_ICONS[iconName];
    const attrs: Record<string, string> = {
        viewBox: icon.viewBox
    };
    if (icon['fill']) attrs['fill'] = icon['fill'];
    if (icon['stroke']) attrs['stroke'] = icon['stroke'];
    if (icon['strokeWidth']) attrs['stroke-width'] = icon['strokeWidth'];
    return attrs;
}
