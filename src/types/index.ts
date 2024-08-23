import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TDescriptionData = string;

export type TTagData = string;

export interface TSolutionData {
  name: string;
  descriptions: TDescriptionData[];
  tags: TTagData[];
}

export interface TFeatureData {
  name: string;
  description?: string;
  tags?: TTagData[];
}

export interface TX404AppYaml {
  name: string;
  hero: string;
  description: string;
  solutions: TSolutionData[];
  features: TFeatureData[];
}

export interface TX404YamlFile {
  app: TX404AppYaml;
}