import { IsNotEmpty, IsString, Length } from 'class-validator'
export class TaskTypeBody {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}