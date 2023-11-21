// src/airports/dto/update-airport.dto.ts
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAirportDto {
  @IsOptional()
  @IsString()
  @MaxLength(4)
  icaoCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  iataCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  country: string;

  @IsOptional()
  latDeg: number;

  @IsOptional()
  latMin: number;

  @IsOptional()
  latSec: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  latDir: string;

  @IsOptional()
  lonDeg: number;

  @IsOptional()
  lonMin: number;

  @IsOptional()
  lonSec: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  lonDir: string;

  @IsOptional()
  altitude: number;

  @IsOptional()
  latDecimal: number;

  @IsOptional()
  lonDecimal: number;
}
