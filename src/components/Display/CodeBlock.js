import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github,googlecode,idea,xcode,solarizedDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Form } from 'antd';

class CodeBlock extends React.PureComponent {
    render() {
        const { value } = this.props;

        return (
            <SyntaxHighlighter language="javascript" style={solarizedDark}>
                {value}
            </SyntaxHighlighter>
        );
    }
}

export default Form.create()(CodeBlock);
