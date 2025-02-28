import { ReportType } from 'htmlhint/types';
import { monaco } from '../constants';
import { DiagnosticSeverity } from 'vscode-css-languageservice';

export const reportTypeToMarkerSeverity: Record<ReportType, monaco.MarkerSeverity> = {
  ['error' as ReportType.error]: monaco.MarkerSeverity.Error,
  ['warning' as ReportType.warning]: monaco.MarkerSeverity.Warning,
  ['info' as ReportType.info]: monaco.MarkerSeverity.Info,
};

export const reportTypeSeverityToMarker: Record<monaco.MarkerSeverity, ReportType> = {
  [8 as monaco.MarkerSeverity.Error]: 'error' as ReportType.error,
  [4 as monaco.MarkerSeverity.Warning]: 'warning' as ReportType.warning,
  [2 as monaco.MarkerSeverity.Info]: 'info' as ReportType.info,
  [1 as monaco.MarkerSeverity.Hint]: 'hint' as ReportType.info
};

export const diagnosticToMarkerSeverity: Record<DiagnosticSeverity, monaco.MarkerSeverity> = {
  [DiagnosticSeverity.Error]: monaco.MarkerSeverity.Error,
  [DiagnosticSeverity.Warning]: monaco.MarkerSeverity.Warning,
  [DiagnosticSeverity.Information]: monaco.MarkerSeverity.Info,
  [DiagnosticSeverity.Hint]: monaco.MarkerSeverity.Hint,
};