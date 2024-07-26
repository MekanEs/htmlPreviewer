import "./chunk-ZJ4C2ABA.js";

// node_modules/monaco-editor/esm/vs/basic-languages/pgsql/pgsql.js
var conf = {
  comments: {
    lineComment: "--",
    blockComment: ["/*", "*/"]
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ]
};
var language = {
  defaultToken: "",
  tokenPostfix: ".sql",
  ignoreCase: true,
  brackets: [
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "(", close: ")", token: "delimiter.parenthesis" }
  ],
  keywords: [
    // This list is generated using `keywords.js`
    "ALL",
    "ANALYSE",
    "ANALYZE",
    "AND",
    "ANY",
    "ARRAY",
    "AS",
    "ASC",
    "ASYMMETRIC",
    "AUTHORIZATION",
    "BINARY",
    "BOTH",
    "CASE",
    "CAST",
    "CHECK",
    "COLLATE",
    "COLLATION",
    "COLUMN",
    "CONCURRENTLY",
    "CONSTRAINT",
    "CREATE",
    "CROSS",
    "CURRENT_CATALOG",
    "CURRENT_DATE",
    "CURRENT_ROLE",
    "CURRENT_SCHEMA",
    "CURRENT_TIME",
    "CURRENT_TIMESTAMP",
    "CURRENT_USER",
    "DEFAULT",
    "DEFERRABLE",
    "DESC",
    "DISTINCT",
    "DO",
    "ELSE",
    "END",
    "EXCEPT",
    "FALSE",
    "FETCH",
    "FOR",
    "FOREIGN",
    "FREEZE",
    "FROM",
    "FULL",
    "GRANT",
    "GROUP",
    "HAVING",
    "ILIKE",
    "IN",
    "INITIALLY",
    "INNER",
    "INTERSECT",
    "INTO",
    "IS",
    "ISNULL",
    "JOIN",
    "LATERAL",
    "LEADING",
    "LEFT",
    "LIKE",
    "LIMIT",
    "LOCALTIME",
    "LOCALTIMESTAMP",
    "NATURAL",
    "NOT",
    "NOTNULL",
    "NULL",
    "OFFSET",
    "ON",
    "ONLY",
    "OR",
    "ORDER",
    "OUTER",
    "OVERLAPS",
    "PLACING",
    "PRIMARY",
    "REFERENCES",
    "RETURNING",
    "RIGHT",
    "SELECT",
    "SESSION_USER",
    "SIMILAR",
    "SOME",
    "SYMMETRIC",
    "TABLE",
    "TABLESAMPLE",
    "THEN",
    "TO",
    "TRAILING",
    "TRUE",
    "UNION",
    "UNIQUE",
    "USER",
    "USING",
    "VARIADIC",
    "VERBOSE",
    "WHEN",
    "WHERE",
    "WINDOW",
    "WITH"
  ],
  operators: [
    "AND",
    "BETWEEN",
    "IN",
    "LIKE",
    "NOT",
    "OR",
    "IS",
    "NULL",
    "INTERSECT",
    "UNION",
    "INNER",
    "JOIN",
    "LEFT",
    "OUTER",
    "RIGHT"
  ],
  builtinFunctions: [
    "abbrev",
    "abs",
    "acldefault",
    "aclexplode",
    "acos",
    "acosd",
    "acosh",
    "age",
    "any",
    "area",
    "array_agg",
    "array_append",
    "array_cat",
    "array_dims",
    "array_fill",
    "array_length",
    "array_lower",
    "array_ndims",
    "array_position",
    "array_positions",
    "array_prepend",
    "array_remove",
    "array_replace",
    "array_to_json",
    "array_to_string",
    "array_to_tsvector",
    "array_upper",
    "ascii",
    "asin",
    "asind",
    "asinh",
    "atan",
    "atan2",
    "atan2d",
    "atand",
    "atanh",
    "avg",
    "bit",
    "bit_and",
    "bit_count",
    "bit_length",
    "bit_or",
    "bit_xor",
    "bool_and",
    "bool_or",
    "bound_box",
    "box",
    "brin_desummarize_range",
    "brin_summarize_new_values",
    "brin_summarize_range",
    "broadcast",
    "btrim",
    "cardinality",
    "cbrt",
    "ceil",
    "ceiling",
    "center",
    "char_length",
    "character_length",
    "chr",
    "circle",
    "clock_timestamp",
    "coalesce",
    "col_description",
    "concat",
    "concat_ws",
    "convert",
    "convert_from",
    "convert_to",
    "corr",
    "cos",
    "cosd",
    "cosh",
    "cot",
    "cotd",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "current_catalog",
    "current_database",
    "current_date",
    "current_query",
    "current_role",
    "current_schema",
    "current_schemas",
    "current_setting",
    "current_time",
    "current_timestamp",
    "current_user",
    "currval",
    "cursor_to_xml",
    "cursor_to_xmlschema",
    "date_bin",
    "date_part",
    "date_trunc",
    "database_to_xml",
    "database_to_xml_and_xmlschema",
    "database_to_xmlschema",
    "decode",
    "degrees",
    "dense_rank",
    "diagonal",
    "diameter",
    "div",
    "encode",
    "enum_first",
    "enum_last",
    "enum_range",
    "every",
    "exp",
    "extract",
    "factorial",
    "family",
    "first_value",
    "floor",
    "format",
    "format_type",
    "gcd",
    "gen_random_uuid",
    "generate_series",
    "generate_subscripts",
    "get_bit",
    "get_byte",
    "get_current_ts_config",
    "gin_clean_pending_list",
    "greatest",
    "grouping",
    "has_any_column_privilege",
    "has_column_privilege",
    "has_database_privilege",
    "has_foreign_data_wrapper_privilege",
    "has_function_privilege",
    "has_language_privilege",
    "has_schema_privilege",
    "has_sequence_privilege",
    "has_server_privilege",
    "has_table_privilege",
    "has_tablespace_privilege",
    "has_type_privilege",
    "height",
    "host",
    "hostmask",
    "inet_client_addr",
    "inet_client_port",
    "inet_merge",
    "inet_same_family",
    "inet_server_addr",
    "inet_server_port",
    "initcap",
    "isclosed",
    "isempty",
    "isfinite",
    "isopen",
    "json_agg",
    "json_array_elements",
    "json_array_elements_text",
    "json_array_length",
    "json_build_array",
    "json_build_object",
    "json_each",
    "json_each_text",
    "json_extract_path",
    "json_extract_path_text",
    "json_object",
    "json_object_agg",
    "json_object_keys",
    "json_populate_record",
    "json_populate_recordset",
    "json_strip_nulls",
    "json_to_record",
    "json_to_recordset",
    "json_to_tsvector",
    "json_typeof",
    "jsonb_agg",
    "jsonb_array_elements",
    "jsonb_array_elements_text",
    "jsonb_array_length",
    "jsonb_build_array",
    "jsonb_build_object",
    "jsonb_each",
    "jsonb_each_text",
    "jsonb_extract_path",
    "jsonb_extract_path_text",
    "jsonb_insert",
    "jsonb_object",
    "jsonb_object_agg",
    "jsonb_object_keys",
    "jsonb_path_exists",
    "jsonb_path_match",
    "jsonb_path_query",
    "jsonb_path_query_array",
    "jsonb_path_exists_tz",
    "jsonb_path_query_first",
    "jsonb_path_query_array_tz",
    "jsonb_path_query_first_tz",
    "jsonb_path_query_tz",
    "jsonb_path_match_tz",
    "jsonb_populate_record",
    "jsonb_populate_recordset",
    "jsonb_pretty",
    "jsonb_set",
    "jsonb_set_lax",
    "jsonb_strip_nulls",
    "jsonb_to_record",
    "jsonb_to_recordset",
    "jsonb_to_tsvector",
    "jsonb_typeof",
    "justify_days",
    "justify_hours",
    "justify_interval",
    "lag",
    "last_value",
    "lastval",
    "lcm",
    "lead",
    "least",
    "left",
    "length",
    "line",
    "ln",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "lower_inc",
    "lower_inf",
    "lpad",
    "lseg",
    "ltrim",
    "macaddr8_set7bit",
    "make_date",
    "make_interval",
    "make_time",
    "make_timestamp",
    "make_timestamptz",
    "makeaclitem",
    "masklen",
    "max",
    "md5",
    "min",
    "min_scale",
    "mod",
    "mode",
    "multirange",
    "netmask",
    "network",
    "nextval",
    "normalize",
    "now",
    "npoints",
    "nth_value",
    "ntile",
    "nullif",
    "num_nonnulls",
    "num_nulls",
    "numnode",
    "obj_description",
    "octet_length",
    "overlay",
    "parse_ident",
    "path",
    "pclose",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "pg_advisory_lock",
    "pg_advisory_lock_shared",
    "pg_advisory_unlock",
    "pg_advisory_unlock_all",
    "pg_advisory_unlock_shared",
    "pg_advisory_xact_lock",
    "pg_advisory_xact_lock_shared",
    "pg_backend_pid",
    "pg_backup_start_time",
    "pg_blocking_pids",
    "pg_cancel_backend",
    "pg_client_encoding",
    "pg_collation_actual_version",
    "pg_collation_is_visible",
    "pg_column_compression",
    "pg_column_size",
    "pg_conf_load_time",
    "pg_control_checkpoint",
    "pg_control_init",
    "pg_control_recovery",
    "pg_control_system",
    "pg_conversion_is_visible",
    "pg_copy_logical_replication_slot",
    "pg_copy_physical_replication_slot",
    "pg_create_logical_replication_slot",
    "pg_create_physical_replication_slot",
    "pg_create_restore_point",
    "pg_current_logfile",
    "pg_current_snapshot",
    "pg_current_wal_flush_lsn",
    "pg_current_wal_insert_lsn",
    "pg_current_wal_lsn",
    "pg_current_xact_id",
    "pg_current_xact_id_if_assigned",
    "pg_current_xlog_flush_location",
    "pg_current_xlog_insert_location",
    "pg_current_xlog_location",
    "pg_database_size",
    "pg_describe_object",
    "pg_drop_replication_slot",
    "pg_event_trigger_ddl_commands",
    "pg_event_trigger_dropped_objects",
    "pg_event_trigger_table_rewrite_oid",
    "pg_event_trigger_table_rewrite_reason",
    "pg_export_snapshot",
    "pg_filenode_relation",
    "pg_function_is_visible",
    "pg_get_catalog_foreign_keys",
    "pg_get_constraintdef",
    "pg_get_expr",
    "pg_get_function_arguments",
    "pg_get_function_identity_arguments",
    "pg_get_function_result",
    "pg_get_functiondef",
    "pg_get_indexdef",
    "pg_get_keywords",
    "pg_get_object_address",
    "pg_get_owned_sequence",
    "pg_get_ruledef",
    "pg_get_serial_sequence",
    "pg_get_statisticsobjdef",
    "pg_get_triggerdef",
    "pg_get_userbyid",
    "pg_get_viewdef",
    "pg_get_wal_replay_pause_state",
    "pg_has_role",
    "pg_identify_object",
    "pg_identify_object_as_address",
    "pg_import_system_collations",
    "pg_index_column_has_property",
    "pg_index_has_property",
    "pg_indexam_has_property",
    "pg_indexes_size",
    "pg_is_in_backup",
    "pg_is_in_recovery",
    "pg_is_other_temp_schema",
    "pg_is_wal_replay_paused",
    "pg_is_xlog_replay_paused",
    "pg_jit_available",
    "pg_last_committed_xact",
    "pg_last_wal_receive_lsn",
    "pg_last_wal_replay_lsn",
    "pg_last_xact_replay_timestamp",
    "pg_last_xlog_receive_location",
    "pg_last_xlog_replay_location",
    "pg_listening_channels",
    "pg_log_backend_memory_contexts",
    "pg_logical_emit_message",
    "pg_logical_slot_get_binary_changes",
    "pg_logical_slot_get_changes",
    "pg_logical_slot_peek_binary_changes",
    "pg_logical_slot_peek_changes",
    "pg_ls_archive_statusdir",
    "pg_ls_dir",
    "pg_ls_logdir",
    "pg_ls_tmpdir",
    "pg_ls_waldir",
    "pg_mcv_list_items",
    "pg_my_temp_schema",
    "pg_notification_queue_usage",
    "pg_opclass_is_visible",
    "pg_operator_is_visible",
    "pg_opfamily_is_visible",
    "pg_options_to_table",
    "pg_partition_ancestors",
    "pg_partition_root",
    "pg_partition_tree",
    "pg_postmaster_start_time",
    "pg_promote",
    "pg_read_binary_file",
    "pg_read_file",
    "pg_relation_filenode",
    "pg_relation_filepath",
    "pg_relation_size",
    "pg_reload_conf",
    "pg_replication_origin_advance",
    "pg_replication_origin_create",
    "pg_replication_origin_drop",
    "pg_replication_origin_oid",
    "pg_replication_origin_progress",
    "pg_replication_origin_session_is_setup",
    "pg_replication_origin_session_progress",
    "pg_replication_origin_session_reset",
    "pg_replication_origin_session_setup",
    "pg_replication_origin_xact_reset",
    "pg_replication_origin_xact_setup",
    "pg_replication_slot_advance",
    "pg_rotate_logfile",
    "pg_safe_snapshot_blocking_pids",
    "pg_size_bytes",
    "pg_size_pretty",
    "pg_sleep",
    "pg_sleep_for",
    "pg_sleep_until",
    "pg_snapshot_xip",
    "pg_snapshot_xmax",
    "pg_snapshot_xmin",
    "pg_start_backup",
    "pg_stat_file",
    "pg_statistics_obj_is_visible",
    "pg_stop_backup",
    "pg_switch_wal",
    "pg_switch_xlog",
    "pg_table_is_visible",
    "pg_table_size",
    "pg_tablespace_databases",
    "pg_tablespace_location",
    "pg_tablespace_size",
    "pg_terminate_backend",
    "pg_total_relation_size",
    "pg_trigger_depth",
    "pg_try_advisory_lock",
    "pg_try_advisory_lock_shared",
    "pg_try_advisory_xact_lock",
    "pg_try_advisory_xact_lock_shared",
    "pg_ts_config_is_visible",
    "pg_ts_dict_is_visible",
    "pg_ts_parser_is_visible",
    "pg_ts_template_is_visible",
    "pg_type_is_visible",
    "pg_typeof",
    "pg_visible_in_snapshot",
    "pg_wal_lsn_diff",
    "pg_wal_replay_pause",
    "pg_wal_replay_resume",
    "pg_walfile_name",
    "pg_walfile_name_offset",
    "pg_xact_commit_timestamp",
    "pg_xact_commit_timestamp_origin",
    "pg_xact_status",
    "pg_xlog_location_diff",
    "pg_xlog_replay_pause",
    "pg_xlog_replay_resume",
    "pg_xlogfile_name",
    "pg_xlogfile_name_offset",
    "phraseto_tsquery",
    "pi",
    "plainto_tsquery",
    "point",
    "polygon",
    "popen",
    "position",
    "power",
    "pqserverversion",
    "query_to_xml",
    "query_to_xml_and_xmlschema",
    "query_to_xmlschema",
    "querytree",
    "quote_ident",
    "quote_literal",
    "quote_nullable",
    "radians",
    "radius",
    "random",
    "range_agg",
    "range_intersect_agg",
    "range_merge",
    "rank",
    "regexp_count",
    "regexp_instr",
    "regexp_like",
    "regexp_match",
    "regexp_matches",
    "regexp_replace",
    "regexp_split_to_array",
    "regexp_split_to_table",
    "regexp_substr",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "repeat",
    "replace",
    "reverse",
    "right",
    "round",
    "row_number",
    "row_security_active",
    "row_to_json",
    "rpad",
    "rtrim",
    "scale",
    "schema_to_xml",
    "schema_to_xml_and_xmlschema",
    "schema_to_xmlschema",
    "session_user",
    "set_bit",
    "set_byte",
    "set_config",
    "set_masklen",
    "setseed",
    "setval",
    "setweight",
    "sha224",
    "sha256",
    "sha384",
    "sha512",
    "shobj_description",
    "sign",
    "sin",
    "sind",
    "sinh",
    "slope",
    "split_part",
    "sprintf",
    "sqrt",
    "starts_with",
    "statement_timestamp",
    "stddev",
    "stddev_pop",
    "stddev_samp",
    "string_agg",
    "string_to_array",
    "string_to_table",
    "strip",
    "strpos",
    "substr",
    "substring",
    "sum",
    "suppress_redundant_updates_trigger",
    "table_to_xml",
    "table_to_xml_and_xmlschema",
    "table_to_xmlschema",
    "tan",
    "tand",
    "tanh",
    "text",
    "timeofday",
    "timezone",
    "to_ascii",
    "to_char",
    "to_date",
    "to_hex",
    "to_json",
    "to_number",
    "to_regclass",
    "to_regcollation",
    "to_regnamespace",
    "to_regoper",
    "to_regoperator",
    "to_regproc",
    "to_regprocedure",
    "to_regrole",
    "to_regtype",
    "to_timestamp",
    "to_tsquery",
    "to_tsvector",
    "transaction_timestamp",
    "translate",
    "trim",
    "trim_array",
    "trim_scale",
    "trunc",
    "ts_debug",
    "ts_delete",
    "ts_filter",
    "ts_headline",
    "ts_lexize",
    "ts_parse",
    "ts_rank",
    "ts_rank_cd",
    "ts_rewrite",
    "ts_stat",
    "ts_token_type",
    "tsquery_phrase",
    "tsvector_to_array",
    "tsvector_update_trigger",
    "tsvector_update_trigger_column",
    "txid_current",
    "txid_current_if_assigned",
    "txid_current_snapshot",
    "txid_snapshot_xip",
    "txid_snapshot_xmax",
    "txid_snapshot_xmin",
    "txid_status",
    "txid_visible_in_snapshot",
    "unistr",
    "unnest",
    "upper",
    "upper_inc",
    "upper_inf",
    "user",
    "var_pop",
    "var_samp",
    "variance",
    "version",
    "websearch_to_tsquery",
    "width",
    "width_bucket",
    "xml_is_well_formed",
    "xml_is_well_formed_content",
    "xml_is_well_formed_document",
    "xmlagg",
    "xmlcomment",
    "xmlconcat",
    "xmlelement",
    "xmlexists",
    "xmlforest",
    "xmlparse",
    "xmlpi",
    "xmlroot",
    "xmlserialize",
    "xpath",
    "xpath_exists"
  ],
  builtinVariables: [
    // NOT SUPPORTED
  ],
  pseudoColumns: [
    // NOT SUPPORTED
  ],
  tokenizer: {
    root: [
      { include: "@comments" },
      { include: "@whitespace" },
      { include: "@pseudoColumns" },
      { include: "@numbers" },
      { include: "@strings" },
      { include: "@complexIdentifiers" },
      { include: "@scopes" },
      [/[;,.]/, "delimiter"],
      [/[()]/, "@brackets"],
      [
        /[\w@#$]+/,
        {
          cases: {
            "@operators": "operator",
            "@builtinVariables": "predefined",
            "@builtinFunctions": "predefined",
            "@keywords": "keyword",
            "@default": "identifier"
          }
        }
      ],
      [/[<>=!%&+\-*/|~^]/, "operator"]
    ],
    whitespace: [[/\s+/, "white"]],
    comments: [
      [/--+.*/, "comment"],
      [/\/\*/, { token: "comment.quote", next: "@comment" }]
    ],
    comment: [
      [/[^*/]+/, "comment"],
      // Not supporting nested comments, as nested comments seem to not be standard?
      // i.e. http://stackoverflow.com/questions/728172/are-there-multiline-comment-delimiters-in-sql-that-are-vendor-agnostic
      // [/\/\*/, { token: 'comment.quote', next: '@push' }],    // nested comment not allowed :-(
      [/\*\//, { token: "comment.quote", next: "@pop" }],
      [/./, "comment"]
    ],
    pseudoColumns: [
      [
        /[$][A-Za-z_][\w@#$]*/,
        {
          cases: {
            "@pseudoColumns": "predefined",
            "@default": "identifier"
          }
        }
      ]
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*/, "number"],
      [/[$][+-]*\d*(\.\d*)?/, "number"],
      [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, "number"]
    ],
    strings: [[/'/, { token: "string", next: "@string" }]],
    string: [
      [/[^']+/, "string"],
      [/''/, "string"],
      [/'/, { token: "string", next: "@pop" }]
    ],
    complexIdentifiers: [[/"/, { token: "identifier.quote", next: "@quotedIdentifier" }]],
    quotedIdentifier: [
      [/[^"]+/, "identifier"],
      [/""/, "identifier"],
      [/"/, { token: "identifier.quote", next: "@pop" }]
    ],
    scopes: [
      // NOT SUPPORTED
    ]
  }
};
export {
  conf,
  language
};
/*! Bundled license information:

monaco-editor/esm/vs/basic-languages/pgsql/pgsql.js:
  (*!-----------------------------------------------------------------------------
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Version: 0.48.0(0037b13fb5d186fdf1e7df51a9416a2de2b8c670)
   * Released under the MIT license
   * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
   *-----------------------------------------------------------------------------*)
*/
//# sourceMappingURL=pgsql-KMFFMXZZ.js.map
