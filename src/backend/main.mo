import Array "mo:core/Array";

actor {
  type Person = {
    name : Text;
    shortDescription : Text;
    message : Text;
  };

  let people : [Person] = [
    {
      name = "Mom";
      shortDescription = "The most caring and loving person in my life.";
      message = "Happy Women's Day! Thank you for your unconditional love and support.";
    },
    {
      name = "Ms Thu";
      shortDescription = "My inspiring former teacher who shaped my learning journey.";
      message = "Happy Women's Day! Your dedication to teaching is truly admirable.";
    },
    {
      name = "Vaishna";
      shortDescription = "A strong and kind friend who brings joy to everyone around her.";
      message = "Happy Women's Day! Keep shining and spreading positivity.";
    },
    {
      name = "Sis Gita";
      shortDescription = "A supportive and understanding sister.";
      message = "Happy Women's Day! Thank you for always being there for me.";
    },
    {
      name = "Sis Gargee";
      shortDescription = "A talented and passionate individual who inspires others.";
      message = "Happy Women's Day! Your creativity and drive are amazing.";
    },
  ];

  public query ({ caller }) func getAllPeople() : async [Person] {
    people;
  };
};
