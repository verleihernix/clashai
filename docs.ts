import { createDocumentation } from 'micro-docgen';

const generate: () => Promise<void> = async () => {
    await createDocumentation({
        markdown: true,
        jsonName: 'docs.json',
        output: 'docs',
        extension: 'md',
        tsconfigPath: './tsconfig.json',
        input: ['./src/index.ts']
    });
}

generate();