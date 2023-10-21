{
  outputs = {nixpkgs, self}: let pkgs= nixpkgs.legacyPackages.x86_64-linux; in {
    devShells.x86_64-linux.default = pkgs.mkShell {
      buildInputs = with pkgs; [openssl_3 bun nodejs];
      PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
      PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
      PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
    };
  };
}
