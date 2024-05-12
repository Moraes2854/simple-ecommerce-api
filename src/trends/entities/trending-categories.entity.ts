import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'trending_categories' })
export class TrendingCategories {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('')
    categories: string[];

    @Column('boolean', {
        default: false,
    })
    isAvailable: boolean;

    @Column('date', {
        default: new Date(),
    })
    createdAt: Date;

    @Column('date', {
        default: new Date(),
    })
    updatedAt: Date;

    @BeforeUpdate()
    checkUpdate(){ 
        this.updatedAt = new Date();
    }

}
