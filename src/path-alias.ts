import path from "path";
import moduleAlias from "module-alias";

moduleAlias.addAlias("@src", __dirname);
moduleAlias.addAlias("@ds", path.join(__dirname, "ds"));
moduleAlias.addAlias("@api", path.join(__dirname, "api"));
moduleAlias.addAlias("@domain", path.join(__dirname, "domain"));
moduleAlias.addAlias("@constants", path.join(__dirname, "constants"));
