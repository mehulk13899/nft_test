import { CoreEntity, CoreEntityT } from 'src/common/entities/core.entity';
import { FoodSchema } from 'src/foods/entities/food.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import {
  ContactInfoEntity,
  ContactInfoSchema,
  ProfileEntity,
  ProfileSchema,
  UserSocialEntity,
  UserSocialSchema,
} from './profile.entity';

export enum InterestedIN {
  trekking = 'trekking',
  crafts = 'crafts',
  material = 'material',
  power_lifting = 'power lifting',
  yoga = 'yoga',
  meditation = 'meditation',
  zumba = 'zumba',
  cycling = 'cycling',
  running = 'running',
  null = '',
}

export class User extends CoreEntity {
  email: string;
  password: string;
  status?: boolean;
  interested_in?: InterestedIN;
  profile?: ProfileEntity;
  social?: UserSocialEntity;
  contact_info?: ContactInfoEntity;
}

@Entity('users')
export class UserT extends CoreEntityT {
  @Column({
    type: 'enum',
    enum: InterestedIN,
    nullable: true,
  })
  interested_in: InterestedIN;

  @Column({
    default: true,
  })
  status: boolean;

  @Column({})
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  loginfrom: string;

  @OneToOne(() => ProfileSchema, (profilet: ProfileSchema) => profilet.user, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  profile: ProfileSchema;

  @OneToOne(() => UserSocialSchema, (social: UserSocialSchema) => social.user, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  social: UserSocialSchema;

  @OneToOne(
    () => ContactInfoSchema,
    (social: ContactInfoSchema) => social.user,
    {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn()
  contact_info: ContactInfoSchema;

  @OneToMany(() => FoodSchema, (food) => food.user, {
    eager: true,
    nullable: true,
  })
  foods: FoodSchema[];
}
