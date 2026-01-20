/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
// import { FeatureModule } from './feature/feature.module';
// import { SurveyModuleModule } from './module/survey-module.module';

// import { SurveyConfigModule } from './survey-config/survey-config.module';
// import { DesignDefinitionModule } from './design-definition/design-definition.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'MYSQL8010.site4now.net',
//       port: 3306,
//       username: 'a66689_mukut',
//       password: 'Root@pass1',
//       database: 'db_a66689_mukut',

//       synchronize: false, // disable in production
//       autoLoadEntities: true,
//       extra: {
//         connectionLimit: 100, // ✅ Increase based on MySQL server's limit
//       },
//     }),
//     UserModule,
//     FeatureModule,
//     DesignDefinitionModule,
//     SurveyModuleModule,
//     SurveyConfigModule,
//   ],
// })
// export class AppModule {}
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';
import { JwtAuthMiddleware } from './middleware/jwt-auth.middleware';
import { AuthModule } from './auth/auth.module';
// Import your feature modules
import { UserModule } from './user/user.module';
import { FeatureModule } from './feature/feature.module';
import { DesignDefinitionModule } from './design-definition/design-definition.module';
import { SurveyModuleModule } from './module/survey-module.module';
import { SurveyConfigModule } from './survey-config/survey-config.module';
import { Role } from './user/user.entity/user.role';
import { User } from './user/user.entity/user.entity';
import { TemplateModule } from './Template/template.module';
import { QueryReportModule } from './query-report/query-report.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // MySQL Database Connection
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'MYSQL8010.site4now.net',
    //   port: 3306,
    //   username: 'a66689_mukut',
    //   password: 'Root@pass1',
    //   database: 'db_a66689_mukut',
    //   synchronize: false, // Never true in production
    //   autoLoadEntities: true,
    //   extra: {
    //     connectionLimit: 100, // ✅ Increase based on MySQL server's limit
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Root@pass1',
      database: 'querybuilder',
      synchronize: true,
      autoLoadEntities: true,
    }),
    // JWT Configuration
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
      signOptions: { expiresIn: '1d' },
    }),
    // ✅ Needed so middleware can inject repositories
    TypeOrmModule.forFeature([User, Role]),

    // JWT configuration is assumed to be inside AuthModule
    AuthModule,
    UserModule,
    FeatureModule,
    DesignDefinitionModule,
    SurveyModuleModule,
    SurveyConfigModule,
    TemplateModule,
    QueryReportModule

  ],
})
export class AppModule {
  //  configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(JwtAuthMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },  // ✅ bypass JWT for login
        { path: 'users/addUser', method: RequestMethod.POST },
        { path: 'users/getAllUsers', method: RequestMethod.GET } // ✅ bypass for user registration
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
