import { Project, SyntaxKind } from "ts-morph";
import { ROUTE_METHODS } from "../../constants";

export class FastifyRouteScanner {
  public scan() {
    const project = new Project();

    project.addSourceFilesAtPaths(
      "C:/Users/Trishak.Jaiswal/Desktop/Fastify/mini-project-1/src/**/*.ts"
    );

        const files = project.getSourceFiles();

            for (const file of files) {
            console.log("\nFile:", file.getBaseName());

            const callExpressions = file.getDescendantsOfKind(
                SyntaxKind.CallExpression);

                for (const callExpression of callExpressions) {
                const expression = callExpression.getExpression();
                const expressionText = expression.getText();
                const matchedMethod = ROUTE_METHODS.find((method) =>
                    expressionText.endsWith(`.${method}`)
                );
                if (!matchedMethod) {
                    continue;
                }
                const args = callExpression.getArguments();
                const pathArg = args[0];
                if (!pathArg) {
                    continue;
                }
                const path = pathArg
                    .getText()
                    .replace(/['"]/g, "");
                console.log( `${matchedMethod.toUpperCase()} ${path}`);
            }
        }
    }
}