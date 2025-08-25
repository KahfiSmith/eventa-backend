import { register } from 'tsconfig-paths';
import { resolve } from 'path';

// Register path aliases from tsconfig.json
register({
  baseUrl: resolve(__dirname, '..'),
  paths: {
    '@/*': ['./src/*'],
    '@/config/*': ['./src/config/*'],
    '@/controllers/*': ['./src/controllers/*'],
    '@/middleware/*': ['./src/middleware/*'],
    '@/models/*': ['./src/models/*'],
    '@/routes/*': ['./src/routes/*'],
    '@/services/*': ['./src/services/*'],
    '@/types/*': ['./src/types/*'],
    '@/utils/*': ['./src/utils/*'],
    '@/validators/*': ['./src/validators/*']
  }
});
