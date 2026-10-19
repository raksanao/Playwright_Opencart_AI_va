import type { Reporter, FullConfig, FullResult, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

type SimpleResult = {
  title: string;
  status: string;
  duration?: number;
  error?: string | null;
};

export default class CustomReporter implements Reporter {
  private results: SimpleResult[] = [];
  private startTime = Date.now();

  onBegin(config: FullConfig, suite: Suite) {
    this.startTime = Date.now();
    console.log(`CustomReporter: run started — projects=${config.projects.length}`);
  }

  onTestBegin(test: TestCase) {
    // no-op
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.results.push({
      title: `${test.parent?.title || ''} > ${test.title}`.replace(/^ > /, ''),
      status: result.status,
      duration: result.duration,
      error: result.error?.message ?? null,
    });
  }

  async onEnd(result: FullResult) {
    const summary = {
      total: this.results.length,
      passed: this.results.filter(r => r.status === 'passed').length,
      failed: this.results.filter(r => r.status === 'failed').length,
      durationMs: Date.now() - this.startTime,
      results: this.results,
    };

    const outDir = path.resolve(process.cwd(), 'custom-report');
    try {
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      const outPath = path.join(outDir, 'custom-report.json');
      fs.writeFileSync(outPath, JSON.stringify(summary, null, 2), 'utf-8');
      console.log(`CustomReporter: wrote summary to ${outPath}`);
    } catch (err) {
      console.error('CustomReporter: failed to write report', err);
    }

    console.log(`CustomReporter: ${summary.passed}/${summary.total} passed, ${summary.failed} failed`);
    return { status: result.status };
  }
}
