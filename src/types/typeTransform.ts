import { ReportType } from 'htmlhint/types';
import { monaco } from '../constants';
import { DiagnosticSeverity } from 'vscode-css-languageservice';

export const reportTypeToMarkerSeverity: Record<ReportType, monaco.MarkerSeverity> = {
  ['error' as ReportType.error]: monaco.MarkerSeverity.Error,
  ['warning' as ReportType.warning]: monaco.MarkerSeverity.Warning,
  ['info' as ReportType.info]: monaco.MarkerSeverity.Info,
};

export const diagnosticToMarkerSeverity: Record<DiagnosticSeverity, monaco.MarkerSeverity> = {
    [DiagnosticSeverity.Error]: monaco.MarkerSeverity.Error,
    [DiagnosticSeverity.Warning]: monaco.MarkerSeverity.Warning,
    [DiagnosticSeverity.Information]: monaco.MarkerSeverity.Info,
    [DiagnosticSeverity.Hint]: monaco.MarkerSeverity.Hint,
};