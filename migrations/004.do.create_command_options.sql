CREATE TABLE command_options(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    command_name TEXT NOT NULL,
    description TEXT NOT NULL,
    extra_field BOOLEAN NOT NULL
)