-- first remove any data that may be present
TRUNCATE  script_options, command_options RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO script_options
  (script_name, extra_input, description)
  VALUES
    ('for', 'true', 'this will repeat the command given a set number of times'),
    ('If', 'true', 'a command inside this will only run if a certain value is true'),
    ('command', 'false', 'a command without any extra qualifications')
    ;

-- insert some items
INSERT INTO command_options
  (command_name, description, extra_field)
  VALUES
  ('echo', 'this command prints the text of a file to the bash terminal, you will need to specify the path of a file to use it (see below on how to find file paths). This command will also print out whatever argument you give below if it is in quotes e.g. "hello, World!"', 'true'),
  ('touch', 'this allows you to create a file in whatever folder you''re currently in. You will need to enter a filename after this. (including the folder you want the file to be in. See more about file paths below.)', 'true'),
  ('mkdir', 'this allows you to make a folder inside whatever folder you''re currently in (change folders with cd). don''t forget to specify a folder name', 'true'),
  ('mv', 'this command means to move but it actually lets you move OR rename files, you will need to enter two file paths (see below on how to find file paths), first the file you want to move, then where you want to move it to OR what you want to rename it to', 'true'),
  ('rmdir', 'this will delete whatever folder you specify in the next box, this function only deletes empty folders though', 'true'),
  ('cp', 'this will copy one a file, you''ll need to specify two file paths (see below on how to find file paths), first the file you want to copy, then where you want to copy it to.', 'true'),
  ('rm', 'this will delete whatever file is at the file path you pass it (see below on how to find file paths), BE CAREFUL. this command can delete important files that make your computer run if you are not careful. ', 'true')
