
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DemoTabContentProps {
  title: string;
  description: string;
  icon: string;
  detailText: string;
  linkUrl: string;
}

const DemoTabContent: React.FC<DemoTabContentProps> = ({ 
  title, 
  description, 
  icon,
  detailText,
  linkUrl
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden shadow-inner">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-medium mb-2">{title}</h3>
              <p className="text-gray-600">
                {description}
              </p>
            </div>
          </div>
        </div>
        <p className="text-gray-600">
          {detailText}
        </p>
        <div className="mt-4">
          <Button variant="outline" className="text-bronze-600" asChild>
            <Link to={linkUrl}>Saiba mais</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoTabContent;
