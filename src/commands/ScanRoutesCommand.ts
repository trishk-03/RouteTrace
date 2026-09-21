import * as vscode from "vscode";
import { FastifyRouteScanner } from "../frameworks/fastify/FastifyRouteScanner";
import { workerData } from "worker_threads";


export function registerScanRoutesCommand() {
  return vscode.commands.registerCommand(
    "routetrace.scanRoutes",
    async () => {
      console.log("Scanning routes...");

      const scanner = new FastifyRouteScanner();

      scanner.scan();
    }
  );
}