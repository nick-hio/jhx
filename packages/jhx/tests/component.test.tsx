import { describe, expect, it } from 'bun:test';

import { JhxComponent } from '../src';
import { renderToString } from 'react-dom/server';

describe('component tests', () => {
    it('allow other props', () => {
        const component = (
            <JhxComponent
                className='test-class'
                id='test-id'
                style={{ color: 'red' }}
                title='Test Title'
            >
                Test
            </JhxComponent>
        );
        expect(renderToString(component)).toBe('<div class="test-class" id="test-id" style="color:red" title="Test Title">Test</div>');
    });

    it('rendering removes DOM handlers', () => {
        const component = (
            <JhxComponent
                onClick={() => alert('Clicked!')}
            >
                Test
            </JhxComponent>
        );
        expect(renderToString(component)).toBe('<div>Test</div>');
    });
});
